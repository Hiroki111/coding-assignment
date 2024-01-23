# Code review for the original code base

## src/App.js

- [Line 22](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L22): `isOpen` is unused. Let's remove it.
- [Line 25](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L25): `closeModal` is unused too.
- [Line 27](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L27): What is this function supposed to do? If this will be used in the future, I think it's helpful to leave a comment to explain the future usage of it.
- [Line 56](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L56): `setOpen(true)` is called in the next line regardless of `!videoKey`, so I think this line is redundant.
- [Line 64](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L64): What if the Promise of this fetch API is rejected? I think it's necessary to implement error handling logic here.
- [Line 67](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L67): I'd write the condition as `videoData?.videos?.results?.length` (This is just my personal preference, though)
- [Line 79](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L79): `Header.jsx` doesn't seem to have `searchParams` and `setSearchParams` props. Aren't they redundant in this line?
- [Line 87](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.js#L87): There is already a scss file for this App.js (`app.scss`). I'd set the style of this element within the scss to make things more consistent.

## src/App.test.js

- [Line 12](https://github.com/Hiroki111/coding-assignment/blob/task1/src/App.test.js#L12): This test case fails at `waitFor` in line 15. I think you need to mock the fetch API, so that the test case receives mock movies.

## src/app.scss

- [Line 8](https://github.com/Hiroki111/coding-assignment/blob/task1/src/app.scss#L8): For the sake of consistency, I'd name this class `.app` (i.e. lower case) 

## src/components/Movie.jsx

- [Line 6](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/Movie.jsx#L6): `closeCard` is unused. Let's remove it.
- [Line 15](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/Movie.jsx#L15): This function name (`myClickHandler`) doesn't describe what the function is supposed to do. How about something like `handleClickClose`?
- [Line 16](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/Movie.jsx#L16): I'm trying to understand what this line is meant to. This handler is used only for onclick events for a button. Is there a case where a button's onclick event is `undefined`? Also, `window.event` is deprecated (https://developer.mozilla.org/en-US/docs/Web/API/Window/event), so I'd avoid using it
- [Line 17](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/Movie.jsx#L17): `cancelBubble` is deprecated too: https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelBubble. Let's remove this and use `stopPropagation` instead
- [Line 19](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/Movie.jsx#L19): `e.target.parentElement.parentElement` seems to be the root element in this component, but isn't it `e.target.parentElement` that can have `'opened'` class?

## src/components/Starred.jsx

- [Line 16](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/Starred.jsx#L16): How about joining this conditional rendering with the one in line 33 (`starred.starredMovies.length === 0`) by using `?` and `:` ? If `starred.starredMovies.length > 0` is false, you can start the second conditional rendering without specifying `starred.starredMovies.length === 0`.

## src/components/WatchLater.jsx

- [Line 18](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/WatchLater.jsx#L18): If I'm not mistaken, this `<div className="row">` will contain multiple `<Movie/>`s. Is it what this `div` element supposed do? I feel that one `<div className="row">` is actually supposed to have only one `<Movie/>`

## src/components/YoutubePlayer.jsx

- [Line 6](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/YoutubePlayer.jsx#L6): `"={true}"` is redundant, if this prop has to be always true
- [Line 7](https://github.com/Hiroki111/coding-assignment/blob/task1/src/components/YoutubePlayer.jsx#L7): Same as line 6. You don't need `"={true}"` here if it's always true.

## src/data/starredSlice.js

- [Line 10](https://github.com/Hiroki111/coding-assignment/blob/task1/src/data/starredSlice.js#L10): I think `state.starredMovies` may have duplicate elements if `starMovie` is dispatched with a movie that is already in `state.starredMovies`. Just to be sure, is that an expected behavior?
- [Line 14](https://github.com/Hiroki111/coding-assignment/blob/task1/src/data/starredSlice.js#L14): `Array.splice()`'s index counts a negative value from the end of the array (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#start). So, I think this line should be called only if `indexOfId` is non-negative.

## src/data/watchLaterSlice.js

- [Line 9](https://github.com/Hiroki111/coding-assignment/blob/task1/src/data/watchLaterSlice.js#L9): Just like `starMovie` in `starredSlice.js`, this `addToWatchLater` action may add a movie that already exists in `state.watchLaterMovies`. Just to be sure, is that an expected behavior?
- [Line 14](https://github.com/Hiroki111/coding-assignment/blob/task1/src/data/watchLaterSlice.js#L14): Just like `unstarMovie` in `starredSlice,js`, it's probably necessary to use this line only if `indexOfId` is non-negative.
- [Line 16](https://github.com/Hiroki111/coding-assignment/blob/task1/src/data/watchLaterSlice.js#L16): This seems a typo (`remveAllWatchLater` -> `removeAllWatchLater`)

## src/styles/header.scss

- [Line 85](https://github.com/Hiroki111/coding-assignment/blob/task1/src/styles/header.scss#L85): Let's remove unnecessary code

## src/styles/movies.scss

- [Line 19](https://github.com/Hiroki111/coding-assignment/blob/task1/src/styles/movies.scss#L19): There is another `.card` in line 181. Can't this `.card` be combined to the other `.card`?
- [Line 21](https://github.com/Hiroki111/coding-assignment/blob/task1/src/styles/movies.scss#L21): I can see `.card` class in `Movie.jsx`, but I can't find any adjacent element of it. Is this `.card + *` used?

## src/test/movie.test.js

- [Line 10](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/movie.test.js#L10): This fails. Just like the failed test in `App.test.js`, I think you need to mock the fetch API at the beginning of this test case.

## src/test/movieSlice.test.js

- [Line 8](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/movieSlice.test.js#L8): This `initialState` variable isn't used. Also, since you're updating the initial state with this action, perhaps it's more accurate to call it `state` or `updatedState` instead of `"initial"State`
- [Line 12](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/movieSlice.test.js#L12): The `action` variable won't have a different value by just being passed into `moviesSlice.reducer`. Assuming that this action is supposed to update the `fetchStatus` of the state, shouldn't you test the state's `fetchStatus` rather than `action` here?
- [Line 15](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/movieSlice.test.js#L15): `'should set movies when action is fulfilled'` is probably a more accurate test case in my opinion. Reducers update and return states, rather than returning payloads.
- [Line 24](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/movieSlice.test.js#L24): Just like line 12, I think the current state's `fetchStatus` and `movies` are what need to be tested here
- [Line 33](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/movieSlice.test.js#L33): Same here. The current state's `fetchStatus` should be tested here

## src/test/starredSlice.test.js

- [Line 4](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/starredSlice.test.js#L4): As I commented on `starredSlice.js`, `unstarMovie` might remove a movie incorrectly if the provided movie doesn't exist. I'd add a test case where `unstarMovie` uses a movie that doesn't exist and `state.starredMovies` still contains the same array of movies

## src/test/watchLater.test.js

- [Line 10](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/watchLater.test.js#L10): Just like in the failed test case in `App.test.js`, I think you need to mock the fetch API so that the API request returns mock movie data. This `waitFor` is failing.
- [Line 17](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/watchLater.test.js#L17): There is no `expect` function used after this `userEvent.click(watchLaterLink)`. Is this really necessary?
- [Line 19](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/watchLater.test.js#L19): If the following lines serve no purpose, let's remove them


## src/test/watchLaterSlice.test.js

- [Line 4](https://github.com/Hiroki111/coding-assignment/blob/task1/src/test/watchLaterSlice.test.js#L4): As I commented in `watchLaterSlice.js`, `removeFromWatchLater` might remove a movie incorrectly if the provided movie doesn't exist. I'd add a test case where `removeFromWatchLater` uses a movie that doesn't exist and `state.watchLaterMovies` still contains the same array of movies

## Others

- Semicolons are missing and formatting isn't consistent. I'd suggest setting a pre-commit hook with a code formatter (e.g. prettier). By doing so, all the files are formatted in a consistent way before making a commit. Likewise, you can set up ESLint with a pre-commit hook. If you set it up, you won't miss unused variables. (I'll be happy to assist you if you need help for setting them up)

- I can see this pattern `const state = useSelector((state) => state)`. I'd prefer destructuring the sate (e.g. `const { starred, watchLater } = useSelector((state) => state)`). In my opinion this is more concise, since `state` itself isn't used.