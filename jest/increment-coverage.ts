import { exec } from 'child_process';
interface ExecOption {
    cwd?: string;
    timeout?: number;
    env?: any
}
export const execProcess = (bin: string, arg: any, opts: ExecOption = {}, extraCommon = '') => {
    return new Promise((resolve, reject) => {
        const command = `${bin} ${arg.join(' ')}`;
        exec(`${command} ${extraCommon}`, opts, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(error || stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

const calcRowNumber = (str: string) => {
    const [ startData, lenData ] = str.split(',');
    const start = Number(startData);
    const len = Number(lenData || 1);
    if (len === 0) {
        return [];
    }
    const row = [start];
    let i = 1;
    while (i < len) {
        row.push(start + i);
        i += 1;
    }
    return row;
}
const formatDiff = (array: string[]) => {
    let currentFile = '';
    return array.reduce((acc, str) => {
        const last = acc[currentFile];
        if (/^[0-9, ]+$/.test(str) && last) {
            const rowNunbers = calcRowNumber(str);
            if (rowNunbers.length) {
                last.push(...rowNunbers);
            }
        } else {  // 文件路径
            currentFile = str;
            acc[str] = [];
        }
        return acc;
    }, {});
}
// git diff --unified=0 origin/master dev | grep -Po '^\+\+\+ ./\K.*|^@@ -[0-9]+(,[0-9]+)? \+\K[0-9]+(,[0-9]+)?(?= @@)'
const getDiffArray = async (repoPath: string, sourceBranch: string, targetBranch: string) => {
    const args = ['diff', '--unified=0', `origin/${targetBranch}`, sourceBranch];
    const grep = ['|', 'grep', '-Po', "'^\\+\\+\\+ ./\\K.*|^@@ -[0-9]+(,[0-9]+)? \\+\\K[0-9]+(,[0-9]+)?(?= @@)'"];
    const result = await execProcess('git', args, { cwd: repoPath }, grep.join(' '));
    const data = result;
    if (!data) {
        return '';
    }
    const dataArray = data.toString().split('\n');
    const diffArray = formatDiff(dataArray);
    return diffArray;
};
const hit = (coverageMap, lineArray: number[]) => {
    const branchMap = coverageMap.branchMap;
    let line = lineArray.shift();
    const startLineMatch = (startLine: number) => {
        while (line < startLine) {
            line = lineArray.shift();
        }
    }
    const incrementBranchMap = {};
    const incrementB = {};
    const unCoverageMap = [];
    let incrementIndex = 0;
    Object.keys(branchMap).forEach((i) => {
        const locations = branchMap[i].locations;
        const b = coverageMap.b[i];
        const bArray = [];
        const incrementLocations = [];
        for (let index = 0, l = locations.length; index < l; index++) {
            const location = locations[index];
            startLineMatch(location.start.line);
            if(line === undefined){
                break;
            }
            if ( line === location.start.line) {
                incrementLocations.push(location);
                bArray.push(b[index]);
                if ( b[index] === 0 ) {
                    unCoverageMap.push(line);
                }
            }
        }

        if (bArray.length > 0) {
            incrementBranchMap[`${incrementIndex}`] = {
                loc: branchMap[i].loc,
                type: branchMap[i].type,
                locations: incrementLocations
            };
            incrementB[`${incrementIndex}`] = bArray;
            incrementIndex++;
        }
    });

    return {
        incrementB,
        incrementBranchMap,
        unCoverageMap,
    }
}
export const getMatchCoverageMap = (element: string, coverageMap) => {
    const keys = Object.keys(coverageMap);
    const match = keys.filter(key => key.endsWith(element));
    if(match.length > 0) {
        return coverageMap[match[0]];
    }

    return false;
}
const getIncrementCoverageMap = (diffArray, coverageMap) => {
    const incrementCoverageMap = {};
    const oldCoverageMap = {};
    const unCoverageMap = {};
    Object.keys(diffArray).forEach(element => {
        const matchCoverage = getMatchCoverageMap(element, coverageMap);
        if (matchCoverage) {
            const diffArrayValue = diffArray[element];
            const increment = hit(matchCoverage, diffArrayValue);
            if (Object.keys(increment.incrementB).length > 0) {
                incrementCoverageMap[element] = Object.assign({}, matchCoverage, {
                    branchMap: increment.incrementBranchMap,
                    b: increment.incrementB,
                });
                oldCoverageMap[element] = matchCoverage;
                if (Array.isArray(increment.unCoverageMap) && increment.unCoverageMap.length > 0) {
                    unCoverageMap[element] = increment.unCoverageMap;
                }
            }
        }
    });
    return { incrementCoverageMap, unCoverageMap };
}
interface Data {
    branch: string;
    targetBranch?: string;
    path?: string;
}
export const incrementCoverage = async (ctx: Data, coverageMap) => {
    const { branch, targetBranch = 'master', path = './' } = ctx;
    const diffArray = await getDiffArray(path, branch, targetBranch);
    const { incrementCoverageMap, unCoverageMap } = getIncrementCoverageMap(diffArray, coverageMap);

    return { incrementCoverageMap, unCoverageMap };
}
