Promises:

  States:
    Pending - promise is still in progress, will be resolved or rejected in the future
    Resolved - promise has a value associated with it, and will call then handlers with that value
    Rejected - promise has a value associated with it, and will call catch handlers with that value,
               propagate to chained promises (i.e. promises created from calling then)

  Constructor:
    Single parameter - callback that takes two arguments.
    Callback arguments are resolve and reject callbacks.
      - resolve callback will set the state of the promise to resolved
        with the value passed to it.

      - reject callback will set the state of the promise to rejected
        with the value passed to it.
    Callback to constructor will be executed synchronously.

  Then:
    Single parameter - callback that takes a single argument
    Callback argument is the value that the promise has been resolved with.
    Returns a new promise, which is resolved with the return value of the callback.
    In the case of the callback throwing, the returned promise is rejected.

  Catch:
    Single parameter - callback that takes a single argument
    Callback argument is the value that the promise has been rejected with.
    Returns a new promise, which is resolved with the return value of the callback.
    In the case of the callback throwing, the returned promise is rejected.
