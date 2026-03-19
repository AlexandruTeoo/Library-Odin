function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.info = function(){
        var text = "";
        text = text.concat(this.title + " by " + this.author + ", " + this.pages.toString() + " pages, ");
        if (this.read == false)
            text = text.concat(`not read yet`);
        else
            text = text.concat(`read it`);
        return text;
    };
}


const theHoobit = new Book("The Hobbit", "J.R.R. Tolkien", 295);
console.log (theHoobit.info());