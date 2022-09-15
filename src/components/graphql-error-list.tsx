import React from "react";

type GraphQLErrorListProps = {
  errors: ReadonlyArray<{ message: string }>;
};

const GraphQLErrorList = ({ errors }: GraphQLErrorListProps) => (
  <div>
    <h1>GraphQL Error</h1>
    {errors.map((error) => (
      <pre key={error.message}>{error.message}</pre>
    ))}
  </div>
);

export default GraphQLErrorList;
