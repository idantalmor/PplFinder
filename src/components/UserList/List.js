import React, { useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { useLocation } from "react-router";
import LocationIcon from "@material-ui/icons/LocationCity";

function List({
  myArray,
  handleMouseLeave,
  handleFavoriteUser,
  lastUserShowing,
  isLoading,
  handleIsVisible,
  handleMouseEnter,
}) {
  const locationRoute = useLocation();
  const [isFavoriteRoute, setIsFavorite] = useState(
    locationRoute.pathname === "/favorites"
  );
  return (
    <S.List>
      {myArray.map((user, index) => {
        return (
          <S.User
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <S.UserPicture src={user?.picture.large} alt="" />
            <S.UserInfo>
              {isFavoriteRoute ? (
                <>
                  <h1 size="30px" style={{ color: "#ff6666" }}>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </h1>
                    <Text size="20px">{user?.email}</Text>

                </>
              ) : (
                <>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                </>
              )}
              <Text size="14px">
                {user?.location.street.number} {user?.location.street.name}
              </Text>
              <Text size="14px">
                {user?.location.city} {user?.location.country}
              </Text>
            </S.UserInfo>
            <S.IconButtonWrapper
              onClick={handleFavoriteUser}
              isVisible={handleIsVisible(user, index)}
            >
              <IconButton>
                <FavoriteIcon color="error" />
              </IconButton>
            </S.IconButtonWrapper>
          </S.User>
        );
      })}

      <div
        style={{
          position: "relative",
          marginBottom: "100px",
        }}
        id="LastUserShow"
        ref={lastUserShowing} // get Ref to lastUserShowing
      />

      {isLoading && (
        <S.SpinnerWrapper>
          <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
        </S.SpinnerWrapper>
      )}
    </S.List>
  );
}

export default List;
