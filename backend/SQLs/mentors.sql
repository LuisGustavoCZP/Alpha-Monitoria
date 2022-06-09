INSERT INTO users ("name", "email", "privilege") VALUES ('Luis', 'luisgustavoczp@gmail.com', 0);
INSERT INTO mentorships ("owner", "link", "time_start", "time_end", "day_week") VALUES (currval('users_id_seq'), '#monitor.luis', '"12:00:00"', '"17:00:00"', 6);

INSERT INTO users ("name", "email", "privilege") VALUES ('Fabrício', 'fabri.rp2010@gmail.com', 0);
INSERT INTO mentorships ("owner", "link", "day_week") VALUES (currval('users_id_seq'), '#monitor.fabrício', 1);

INSERT INTO users ("name", "email", "privilege") VALUES ('Plínio', '', 0);
INSERT INTO mentorships ("owner", "link", "day_week") VALUES (currval('users_id_seq'), '#monitor.plinio', 2);

INSERT INTO users ("name", "email", "privilege") VALUES ('Tiago', '', 0);
INSERT INTO mentorships ("owner", "link", "day_week") VALUES (currval('users_id_seq'), '#monitor.tiago', 3);

INSERT INTO users ("name", "email", "privilege") VALUES ('Anderson', '', 0);
INSERT INTO mentorships ("owner", "link", "day_week") VALUES (currval('users_id_seq'), '#monitor.anderson', 4);