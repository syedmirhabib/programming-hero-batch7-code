import dynamicTitle from "../hooks/dynamicTitle";

export default function Blog() {
  dynamicTitle("Blog");

  const blogPosts = [
    {
      title: "What is an access token and refresh token? How do they work and where should we store them on the client-side?",
      content:
        "Access Token and Refresh Token: Access tokens are credentials issued to a client after successful authentication, used to access protected resources. Refresh tokens are long-lived credentials used to obtain new access tokens without re-authentication. Access tokens are typically stored on the client-side using secure storage mechanisms like HTTP-only cookies or local storage, while refresh tokens should be stored securely on the server-side.",
    },
    {
      title: "Compare SQL and NoSQL databases?",
      content:
        "SQL vs. NoSQL Databases: SQL databases are relational, have predefined schemas, and use SQL for querying. They provide ACID properties and are suitable for complex transactions and data integrity. NoSQL databases are non-relational, flexible, and schema-less. They store data in various formats like key-value pairs, documents, or graphs. They excel in handling unstructured or rapidly changing data and offer high scalability and performance.",
    },
    {
      title: "What is Express.js?",
      content:
        "Express.js: Express.js is a web application framework for Node.js. It simplifies building web applications and APIs by providing a minimalistic and flexible set of features. It handles HTTP requests, defines routes, manages middleware, and more. Express.js is widely used and has a large ecosystem of extensions and middleware.",
    },
    {
      title: "What is Nest JS?",
      content:
        "NestJS: NestJS is a progressive Node.js framework inspired by Angular. It's built with TypeScript and designed for building scalable server-side applications. It follows a modular architecture, offers powerful features like dependency injection and decorators, and promotes code reusability, testability, and maintainability.",
    },
    {
      title: "What is MongoDB aggregate and how does it work?",
      content:
        "MongoDB Aggregate: MongoDB's aggregate is a framework for data aggregation and analysis. It allows advanced queries and transformations within the database. Aggregation pipelines consist of multiple stages, where each stage performs a specific operation on the data. These stages include filtering, grouping, sorting, projecting, and more. Aggregation pipelines provide a flexible way to process and analyze data efficiently in MongoDB.",
    },
  ];

  return (
    <div className="bg-gray-100 py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 transition duration-300 hover:shadow-xl"
          >
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-base">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
