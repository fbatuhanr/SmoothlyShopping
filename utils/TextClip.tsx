const textClip = (text: string, maxLen:number = 20) => {
    if(text.length < maxLen) return text;
    return `${text.substring(0, maxLen-3)}...`
}

export default textClip