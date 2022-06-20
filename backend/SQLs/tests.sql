--SELECT * FROM users;
--SELECT * FROM mentorships;
--DELETE FROM users CASCADE;
/*
CREATE or REPLACE VIEW view_mentors AS
  SELECT "name", "privilege", "email", "link", "time_start", "time_end", "day_week"
  FROM users
  INNER JOIN mentorships
  ON mentorships.id = users.id
  WHERE users.privilege = 0;
*/
--SELECT * FROM view_mentors;
