/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description: 
 */
import { execa } from 'execa';
import { exec } from 'child_process';

export const run = (bin, arg, opts = {}) => execa(bin, arg, { stdio: 'inherit', ...opts });

export const runCommand = (bin, opts = {}) => {
    const array = bin.split(' ');
    if(array.length > 1) {
        const bin = array[0];
        const arg = array.splice(1);
        return run(bin, arg, opts);
    } else {
        throw Error(commandError.msg);
    }
}
export const execCommand = (bin, arg, opts) => {
    return new Promise((resolve, reject) => {
        if (Object.prototype.hasOwnProperty.call(opts, 'env')) {
            opts.env = Object.assign({}, process.env, opts.env);
        }
        const command = `${bin} ${arg.join(' ')}`;

        const child_process = exec(command, opts);
        const stdoutArray = [];
        child_process.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            stdoutArray.push(data);
        });
        child_process.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });
        
        child_process.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code === 0) {
                resolve({
                    code: 0,
                    result: stdoutArray.slice(-30).join('/n'),
                });
            } else {
                reject({
                    code: -1,
                    result: stdoutArray.slice(-30).join('/n'),
                });
            }
        });
    });
};
