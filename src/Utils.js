export const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    return date.toLocaleDateString('id-ID', options)
}

export const getRecentTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()

    const diffMs = Math.max(0, now - date);

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (days > 0) {
        return `${days} hari yang lalu`
    } else if (hours > 0) {
        return `${hours} jam yang lalu`
    } else if (minutes > 0) {
        return `${minutes} menit yang lalu`
    } else {
        return `${seconds} detik yang lalu`
    }
};