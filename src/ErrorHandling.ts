export const checkSizeError = (xPosition: number, yPosition: number) => {
    if (xPosition > 50 || yPosition > 50) throw new Error('Maximum coordinate value is 50');
    if (xPosition < 0 || yPosition < 0) throw new Error('Negative values are not valid coordinates');
}

export const checkInstructionError = (instruction: string) => {
    if (instruction.length >= 100) throw new Error('Instructions must have less than 100 characters');
}