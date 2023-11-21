import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Player from "./components/Player/Player";

const secondsInHours = 24 * 60 * 60; // 24hours in seconds

const queryClient = new QueryClient({
  //is responsible for managing the caching, fetching, and state of queries in your React application.
  queries: {
    staleTime: secondsInHours * 1000,
    cacheTime: secondsInHours * 1000,
  },

  //stale time signifies how long the data is "fresh" for. If stale will trigger refetch
  //cacheTime option defines the time, in milliseconds, that the data of a successful query result will be retained in the cache before potentially being garbage-collected.
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* form with first and second name */}
        <Player />
      </div>
    </QueryClientProvider>
  );
}

export default App;
