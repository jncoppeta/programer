
-- Create the 'exercises' table
CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    warmupSets INT,
    workingSets INT,
    reps INT,
    percentage DECIMAL(5, 2),
    notes TEXT,
    week INT,
    day INT,
    programName VARCHAR(255)
);

-- Create the 'programs' table
CREATE TABLE IF NOT EXISTS programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50)
);

-- Create the 'weeks' table
CREATE TABLE IF NOT EXISTS weeks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    week INT,
    numDay INT,
    program VARCHAR(255)
);
