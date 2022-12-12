How to create the environment variables

You will need to create two .env files for this project: .env.test and .env.development.

Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names).

Double check that these .env files are .gitignored.
