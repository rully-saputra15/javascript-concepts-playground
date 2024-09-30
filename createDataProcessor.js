/**
 * Exercise: Implement an Asynchronous Data Processor

Create a function called `createDataProcessor` that returns an object with methods to fetch, process, and analyze data asynchronously. The data processor should have the following features:

1. Fetch data from multiple mock API endpoints (simulate with setTimeout).
2. Process and combine the fetched data.
3. Perform various analyses on the combined data.
4. Cache processed results for faster subsequent retrievals.
5. Provide a way to clear the cache.

The mock data should represent information about books and their authors.

Implement the following methods:

- fetchData(): Fetches data from mock API endpoints.
- processData(): Combines and processes the fetched data.
- getBooksByAuthor(authorName): Returns books by a specific author.
- getAverageRating(): Calculates the average rating of all books.
- getMostProlifcAuthor(): Returns the author with the most books.
- clearCache(): Clears the cached results.

 */

const createDataProcessor = () => {
    const data = new Map();
    const cache = new Map();

    const clearCache = () => {
        cache.clear()
    }
    return {
        fetchData: () => {
            return new Promise(resolve => setTimeout(() => {
                const result = [
                    { id: 1,title: 'John Doe 1',author: 'John Doe',rating: 7},
                    { id: 2,title: 'John Doe 2',author: 'John Doe',rating: 7.5},
                    { id: 3,title: 'John Doe 3',author: 'John Doe',rating: 6},
                    { id: 4,title: 'Jane Doe 1',author: 'Jane Doe',rating: 8},
                    { id: 5,title: 'Jane Doe 2',author: 'Jane Doe',rating: 9}
                ]
                result.forEach((book) => {
                    data.set(book.id,book)
                })
                resolve();
            },500))
        },
        processData: () => {
            return new Promise(resolve => setTimeout(() => {
                data.forEach((book) => {
                    book.processData = new Date();
                })
                resolve();
            },500))
        },
        getBooksByAuthor: (authorName) => {
            const loweredAuthorName = authorName.toLowerCase();
            if(cache.has(loweredAuthorName)){
                return cache.get(loweredAuthorName)
            }

            const books = [...data.values()].filter((book) => book.author.toLowerCase() === loweredAuthorName);
            if(books.length <= 0) {
                return "Not found"
            }
            cache.set(loweredAuthorName, books)
            return books;
        },
        getAverageRating: () => {
            return [...data.values()].reduce((acc, val) => {
                return acc + val.rating
            },0) / data.size
        },
        clearCache: () => {
            clearCache();
            return "cache cleared"
        },
        getMostProlificAuthor: () => {
            const authorBook = new Map();
            data.forEach((book) => {
                authorBook.set(book.author, (authorBook.get(book.author) || 0) + 1)
            })
            return [...authorBook.entries()].reduce((a,b) => a[1] > b[1] ? a : b)[0]
        }
    }
}

const processor = createDataProcessor();

processor.fetchData()
.then(() => processor.processData())
.then(() => {
    console.log(processor.getBooksByAuthor("John Doe"))
    console.log(processor.getBooksByAuthor("Jane Doe"))
    console.log(processor.getAverageRating())
    console.log(processor.getMostProlificAuthor())
    console.log(processor.clearCache())
    return processor.getBooksByAuthor("John Doe")
}).then((res) => console.log(res))