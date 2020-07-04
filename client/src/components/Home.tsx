import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const GET_ITEMS = gql`
  {
    items {
      id
      name
      platform {
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_ITEMS);
  return (
    <div
      css={css`
        padding: 10px;
      `}
    >
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      {data?.items.map(({ name, platform }: { name: string; platform: any }) => (
        <div>
          <div>{name}</div>
          <div>{platform.name}</div>
        </div>
      ))}
    </div>
  );
}
