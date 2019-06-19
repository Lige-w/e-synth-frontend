class Audio {
    static context = new (window.AudioContext || window.webkitAudioContext)()

    static masterGainNode = Audio.context.createGain()

    static distortionNode = Audio.context.createWaveShaper()
}

export default Audio
