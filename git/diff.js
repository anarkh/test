/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description: 
 */
import { run } from '../utils/exec-command'

const getDiff = async (repoPath) => {
    const result = await run('git', ['diff', 'master', 'main'], { cwd: repoPath });
    return result.stdout;
};

getDiff().then(console.log);