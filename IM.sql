\echo 'Delete and recreate im db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE im;

CREATE DATABASE im;

\connect im
\i IM-schema.sql
-- \i IM-seed.sql
\echo 'Delete and recreate im_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE im_test;

CREATE DATABASE im_test;

\connect IM_test
\i IM-schema.sql
