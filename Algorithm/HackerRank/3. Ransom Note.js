function checkMagazine(magazine, note) {
    for(let i = 0; i < note.length; i++) {
        const index = magazine.indexOf(note[i]);
        if(index > -1) {
            magazine.splice(index, 1);
        }else {
            console.log('No');
            return;
        }
    }
    console.log('Yes');
}