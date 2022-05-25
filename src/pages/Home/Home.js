import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";


const Home = () => {
  const [loadMore, setLoadMore] = useState(0); // Sent as a parameter to the process of loading people and so we will know if it is loaded further
  const { users, isLoading } = usePeopleFetch(loadMore); //Bring in new people by hook

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          loadMore={loadMore}
          setLoadMore={setLoadMore}
          users={users}
          isLoading={isLoading}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
