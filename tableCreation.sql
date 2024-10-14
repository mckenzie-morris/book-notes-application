CREATE TABLE reviews (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    street_address VARCHAR(250),
    state VARCHAR(25),
    user_review TEXT,
    user_rating INT CHECK (user_rating BETWEEN 0 AND 10) NOT NULL
);