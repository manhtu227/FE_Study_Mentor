export function calculateAge(birthDateString: string) {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}
