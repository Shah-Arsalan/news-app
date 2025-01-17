import { useEffect, useState } from "react";
import { filterCategories } from "./utils";

import { useDispatch, useSelector } from "react-redux";
import { getCategories, getSources, postCategories } from "./Redux/newsSlice";

import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./Screens/Login";
import { Home } from "./Screens/Home";

export default function App() {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const [id, setId] = useState(null);
  const { newcategories, sources, categoryNews, loading, error } = useSelector(
    (state) => state.news
  );

  const { token } = useSelector((state) => state.auth);

  const categories = filterCategories(sources);

  useEffect(() => {
    dispatch(getSources());
  }, []);

  useEffect(() => {
    const syncCategories = async () => {
      try {
        await dispatch(postCategories({ token, categories }));
        dispatch(getCategories(token));
      } catch (error) {
        console.error("Error syncing categories:", error);
      }
    };

    syncCategories();
  }, [sources, token]);

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen
          name="Home"
          component={(props) => (
            <Home
              {...props}
              categories={newcategories}
              id={id}
              setId={setId}
              loading={loading}
              categoryNews={categoryNews}
            />
          )}
        />
      ) : (
        <Stack.Screen name="Login" component={LoginPage} />
      )}
    </Stack.Navigator>
  );
}
