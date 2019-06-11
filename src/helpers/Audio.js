class AudioHelper {
    static context = new (window.AudioContext || window.webkitAudioContext)()
}

export default AudioHelper