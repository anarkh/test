/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description: 
 */
import { run } from '../utils/exec-command.js'

const getDiff = async (repoPath) => {
    const result = await run('git', ['diff', '--unified=0', 'master', 'main', '|', 'grep', '-Po', "'^\+\+\+ ./\K.*|^@@ -[0-9]+(,[0-9]+)? \+\K[0-9]+(,[0-9]+)?(?= @@)'"], { cwd: repoPath });
    return result.stdout;
};

getDiff().then(console.log);