const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((acc, blog) => acc + blog.likes, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    const first = sorted[0]

    return {title: first.title, author: first.author, likes: first.likes}
}

const mostBlogs = (blogs) => {
    const mapped = blogs.map(b => b.author)
    const reduced = mapped.reduce((acc, author) => {
        const found = acc.find(b => b.author === author)
        if (found) {
            found.blogs += 1
        } else {
            acc.push({author, blogs: 1})
        }

        return acc
    }, [])

    return reduced.sort((a,b) => b.blogs - a.blogs)[0]
}

const mostLikes = (blogs) => {
    const reduced = blogs.reduce((acc, blog) => {
        const found = acc.find(author => author.author === blog.author)

        if (found) {
            found.likes += blog.likes
        } else {
            const { author, likes } = blog
            acc.push({ author, likes })
        }

        return acc
    }, [])

    return reduced.sort((a, b) => b.likes - a.likes)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}