# Code review for the original code base

## src/App.js

- Line 22: `isOpen` is unused. Let's remove it.
- Line 25: `closeModal` is unused too.
- Line 27: What this `closeCard` function is meant to? If this will be used in the future, I think it's helpful to leave a comment to explain the future usage of it.
- Line 33: I'd prefer "dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`)) (although this is just my personal preference).
- Line 56: `setOpen(true)` is called in the next line regardless of `!videoKey`, so I think that this line is redundant.
- Line 64: What if the Promise of this fetch API is rejected? Isn't it necessary to implement error handling logic here?
- Line 67: I'd write the condition as `videoData?.videos?.results?.length` (Again, this is just my personal preference)
- Line 69: I take it that `trailer` must have key field. Otherwise, `trailer?.key` should be used as the condition
- Line 79: `Header.jsx` doesn't seem to have `searchParams` and `setSearchParams` props. Aren't they redundant?
- Line 87: There is already a scss file for this App.js (`app.scss`). I'd set the style of this element with the scss to make things more consistent.

## src/App.test.js

- Line 12: This test case fails at `waitFor`. I think you need to mock the fetch API, so that the test case receives mock movies.

## src/app.scss

- Line 8: For the sake of consistency, I'd name this class `.app` (i.e. lower case) 

## src/components/Movie.jsx

- Line 6: `closeCard` is unused. Let's remove it.
- Line 15: This function name (`myClickHandler`) doesn't describe what the function is supposed to do. How about something like `handleClickClose`?
- Line 16: I'm trying to understand what this line is meant to. This handler is used only for onclick events for button. Is there a case where a button's onclick event is `undefined`? Also, window.event is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/Window/event
-l17: `cancelBubble` is deprecated too: https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelBubble. Let's remove this and use `stopPropagation` instead
- Line 19: `e.target.parentElement.parentElement` seems to be the root element in this component, but isn't it `e.target.parentElement` that can have 'opened' class?

## src/components/Starred.jsx

- Line 16: How about joining this conditional rendering with the one in line 33 (`starred.starredMovies.length === 0`) by using `?` and `:` ? If `starred.starredMovies.length > 0` is false, you can start the second conditional rendering without specifying `starred.starredMovies.length === 0`.

## src/components/WatchLater.jsx

- Line 18: If I'm not mistaken, this `<div className="row">` will contain multiple `<Movie/>`s. Is it what it's supposed do? I feel that one `<div className="row">` is actually supposed to have only one `<Movie/>`

## src/components/YoutubePlayer.jsx

- Line 6: `"={true}"` is redundant, if this prop has to be always true
- Line 7: Same as line 6. You may not need `"={true}"`.

## src/data/starredSlice.js

- Line 10: I think `state.starredMovies` may have duplicate elements if `starMovie` is dispatched with a movie that is already in `state.starredMovies`. If so, is that an expected behavior?
- Line 12: `Array.splice()`'s index counts a negative value from the end of the array. So, I think this line should be called only if `indexOfId` is non-negative.

## src/data/watchLaterSlice.js

- Line 9: Just like `starMovie` in `starredSlice.js`, this `addToWatchLater` action may add a movie that already exists in `state.watchLaterMovies`. Is that an expected behavior?
- Line 15: Again, just like `unstarMovie` in `starredSlice,js`, it's probably necessary to call use the following line only if `indexOfId` is non-negative
- Line 18: This seems a typo (`remveAllWatchLater` -> `removeAllWatchLater`)

## src/styles/header.scss

- Line 85: Let's remove unnecessary code

## src/styles/movies.scss

- Line 19: There is another `.card` in line 181. Can't this `.card` be combined to the other `.card`?
- Line 21: I can see `.card` class in `Movie.jsx`, but I can't find any adjacent element of it. Is this `.card + *` used?

## src/test/movie.test.js

- Line 10: This fails at the `WaitFor` in line 10. Just like the failed test in `App.test.js`, I think you need to mock the fetch API

## src/test/movieSlice.test.js

- Line 8: This `initialState` variable isn't used. Also, since you're updating the initial state with this action, perhaps it's more accurate to call it "state" rather than "initialState"
- Line 12:  The `action` variable won't have a different value by just being passed into `moviesSlice.reducer`. Assuming that this action is supposed to update the `fetchStatus` of the state, shouldn't you test the state's `fetchStatus` rather than `action` here?
- Line 15:  `'should set payload when action is fulfilled'` is a probably more accurate test case in my humble opinion. Reducers return states, not payloads
- Line 24: Again, the current state's `fetchStatus` and `movies` are what need to be tested here
- Line 33: Same here. The current state's `fetchStatus` should be tested here

## src/test/starredSlice.test.js

- Line 4: As I commented on `starredSlice.js`, `unstarMovie` might remove a movie incorrectly if the provided movie doesn't exist. I'd add a test case where `unstarMovie` uses a movie that doesn't exist and `state.starredMovies` still contains the same array of movies

## src/test/watchLater.test.js

- Line 9: Just like in `App.test.js`, I think you need to mock the fetch API so that this test case receives movie data. The following `waitFor` fails.
- Line 17: There is no `expect` function used after this `userEvent.click(watchLaterLink)`. Is this really necessary?
- Line 19: If the following lines serve no purpose, let's remove them


## src/test/watchLaterSlice.test.js

- Line 4: As I commented in `watchLaterSlice.js`, `removeFromWatchLater` might remove a movie incorrectly if the provided movie doesn't exist. I'd add a test case where `removeFromWatchLater` uses a movie that doesn't exist and `state.watchLaterMovies` still contains the same array of movies

## Others

- Semicolons are missing and formatting isn't consistent. I'd suggest setting a pre-commit hook with a code formatter (e.g. prettier). By doing so, all the files are formatted in a consistent way before making a commit. Likewise, you can set up ESLint with a pre-commit hook. If you do this, you won't miss if there is any unused variables. (I'll be happy to assist you if you need help for setting them up)

- I can see this pattern `const state = useSelector((state) => state)`. I'd prefer destructuring the sate (e.g. `const { starred, watchLater } = useSelector((state) => state)`). This way is more concise in my opinion, as `state` itself isn't used.