import React, { useRef, useCallback, useState } from "react";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { toggleFavoriteAction } from "store/actions/favoritesActions";
import { countriesAction } from "store/actions/filtersActions";
import List from "./List";
import Filters from "./Filters";

const UserList = ({ users, isLoading, setLoadMore, loadMore }) => {
  const locationRoute = useLocation(); // Will be used to check if I am on the main page or the favorites page
  const observer = useRef();
  const dispatch = useDispatch();
  const [hoveredUserId, setHoveredUserId] = useState();
  const countries = useSelector((state) => state.filters.countries);
  const favoritesList = useSelector((state) => state.favorites.favList);
  const [isFavoriteRoute, setIsFavorite] = useState((locationRoute.pathname === "/favorites"))

  const lastUserShowing = useCallback((node) => {
    console.log("node is:" + node);
    if (isLoading || loadMore === 1 || isFavoriteRoute) return;
    console.log("observer.current" + "" + observer.current);
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadMore((prev) => prev + 1);
      }
    });
    if (node) {
      //if node ->observer on div ref
      observer.current.observe(node);
    }
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // Adds and removes people to favorite according to reducer
  const handleFavoriteUser = () => {
    if (!users[hoveredUserId].email) return;
    const checkUserFav = favoritesList.find(
      (user) => user.email === users[hoveredUserId].email
    );
    const actionType = checkUserFav ? "REMOVE_FAVORITE" : "ADD_FAVORITE";
    dispatch(toggleFavoriteAction(actionType, users[hoveredUserId]));
  };

  
  const handleIsVisible = (user, index) => {
    //show heart icon or not
    return (
      index === hoveredUserId  || favoritesList.find((exist) => exist.email === user.email)
    );
    // index === hoveredUserId - for scroll
  };


  const handleCountryFilter = (country) => {
    //handle countries filter
    const countryChecked = countries[country];
    const actionType = countryChecked ? "REMOVE_COUNTRY" : "ADD_COUNTRY";
    console.log("isChecked", countryChecked);
    dispatch(countriesAction(actionType, country));
  };


  return (
    <S.UserList>
      {!isFavoriteRoute && (
        <>
          <Filters countries={countries} handleCountryFilter={handleCountryFilter} />
          <h2>Number of loading: {loadMore}</h2>
        </>
      )}
      <List
        myArray={users}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
        handleFavoriteUser={handleFavoriteUser}
        handleIsVisible={handleIsVisible}
        lastUserShowing={lastUserShowing}
        isLoading={isLoading}
      />
    </S.UserList>
  );
};

export default UserList;
