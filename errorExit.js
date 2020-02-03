export default class errorExit {
    apply(compiler) {
        // tap(触及) 到 compilation hook，而在 callback 回调时，会将 compilation 对象作为参数，
        compiler.hooks.failed.tap('HelloCompilationPlugin', error => {
            console.log('\n================================= Error Start =================================\n')
            console.log(error)
            console.log('\n================================== Error End ==================================\n')
            if(error) {
                process.exit(1);
            }
        });
    }
}