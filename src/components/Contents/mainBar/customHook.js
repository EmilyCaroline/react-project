import { useEffect, useCallback, useRef } from 'react';

// make API calls and pass the returned data via dispatch
export const useFetch = (data, dispatch) => {
  useEffect(() => {
    dispatch({ type: 'FETCHING_POSTS', fetching: true })
    console.log(data)
    let url = null;

    if(data.lastPostName == '')
    {
     
      url = "https://www.reddit.com/r/makeup.json?limit=10"
    }
    else
    {
      
      url = `https://www.reddit.com/r/makeup.json?limit=20&after=${data.lastPostName}`
    }

    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(data => 
        {

            if (data != null)
            {
                let arr = data.data.children
                let after = data.data.after
                dispatch({ type: 'STACK_POSTS', arr})
                dispatch({ type: 'FETCHING_POSTS', fetching: false })

            }

      })
      .catch(e => {
        // handle error
        dispatch({ type: 'FETCHING_POSTS', fetching: false })
        return e;
      })
  }, [dispatch, data.page])
  
}

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {

  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
}