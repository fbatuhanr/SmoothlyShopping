const textClip = (text: string) => {
    if(text.length < 20) return text;
    return `${text.substring(0, 17)}...`
}

export default textClip