import libCoverage from 'istanbul-lib-coverage';
import { resolve, relative } from 'path';
import { incrementCoverage } from './increment-coverage';
import { readFileSync, accessSync, realpathSync } from 'fs';
import { parse } from 'yaml';
// 程序执行路径，即当前进程目录，可能是软链
const currentProcessPath = process.env.PWD;
// 原始路径
const currentPath = realpathSync(currentProcessPath);

const getCoverageMap = (coverageMap) => {
  const result = {};
  Object.keys(coverageMap).forEach((element) => {
    const map = libCoverage.createCoverageMap({
      element: coverageMap[element],
    });
    const summary = libCoverage.createCoverageSummary();
    map.files().forEach((f) => {
        const fc = map.fileCoverageFor(f);
        const s = fc.toSummary();
        summary.merge(s);
    });
    result[element] = summary.data.branches.pct;
  });
  return result;
}

const flatConfig = (path: string, yml) => {
  const result = {};
  const flat = (list, prefix: string, obj: Record<string, any> | number) => {
    Object.keys(obj).forEach((key) => {
      const path = resolve(prefix, key);
      if (typeof obj[key] === 'object') {
        flat(list, path, obj[key]);
      } else if (typeof obj[key] === 'number') {
        const relativePath = relative(currentPath, path);
        list[relativePath] = obj[key];
      } else {
        console.error(`${path} is not number`);
      }
    });
  }
  flat(result, path, yml);
  return result;
}
const getConfig = (path: string) => {
  const configPath = resolve(path, './jest-coverage.yml');
  try {
    accessSync(configPath);
  } catch (err) {
    console.warn(`config not found: ${configPath} \nuse default 80% redline`);
    return null;
  }
  const yml = readFileSync(configPath, 'utf8');
  const config = parse(yml);
  const result = flatConfig(path, config);
  return result;
}

const getFullCoverageConfig = (coverageMap: Record<string, number>, flatConfig: Record<string, number>, defaultConfig = 80) => {
  const fullConfig = {};
  const redLine = {};
  const flatConfigKeys = Object.keys(flatConfig);
  Object.keys(coverageMap).forEach(element => {
    let line = defaultConfig;
    for(const key of flatConfigKeys) {
      if (element.startsWith(key)){
        line = flatConfig[key];
        break;
      }
    }
    fullConfig[element] = line;
    if (line > coverageMap[element]) {
      redLine[element] = `${coverageMap[element]} < ${line}`;
    }
  });

  return { fullConfig, redLine };
}

export const incrementCoverageFromConfig = async (ctx, coverageMap) => {
  const { path = './' } = ctx;
  const { incrementCoverageMap } = await incrementCoverage(ctx, coverageMap);
  const coverageList = getCoverageMap(incrementCoverageMap);
  const result = getConfig(path) ?? {};
  const { fullConfig, redLine } = getFullCoverageConfig(coverageList, result);
  console.log(coverageList);
  console.log(fullConfig);
  console.log(redLine);
  return { fullConfig, redLine };
}