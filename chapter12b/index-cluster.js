const cluster = require('cluster')

function startWorker() {
    const worker = cluster.fork()
    console.log(`CLUSTER: worker ${worker.id} started`)
}

if (cluster.isPrimary) {
    require('os').cpus().forEach(startWorker)

    cluster.on('disconnect', worker =>
        console.log(`Worker : ${worker.id} disconected`)
    )

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker: ${worker.id} exit code ${code} (${signal})`)
        startWorker()
    })

} else{
    const port = process.env.PORT || 3000
    require('./index.js')(port)
}