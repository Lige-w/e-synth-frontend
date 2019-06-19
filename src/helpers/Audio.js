class Audio {
    static context = new (window.AudioContext || window.webkitAudioContext)()

    static masterGainNode = Audio.context.createGain()

    static compressor = Audio.context.createDynamicsCompressor()
}

export default Audio
