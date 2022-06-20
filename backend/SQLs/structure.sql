CREATE TABLE public.users (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"privilege" integer NOT NULL,
	"email" varchar(255),
	"created_by" integer,
	"updated_by" integer,
	"deleted_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.news (
	"id" serial NOT NULL,
	"title" varchar(80) NOT NULL,
	"description" varchar(300) NOT NULL,
	"link" varchar(200),
	"created_by" integer,
	"updated_by" integer,
	"deleted_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "news_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.navigations (
	"id" serial NOT NULL,
	"menu" varchar(80) NOT NULL,
	"name" varchar(80) NOT NULL,
	"title" varchar(200) NOT NULL,
	"path" varchar NOT NULL,
	"description" varchar(300),
	"created_by" integer,
	"updated_by" integer,
	"deleted_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "navigations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.doubts (
	"id" serial NOT NULL,
	"trail" varchar(20) NOT NULL,
	"content" varchar NOT NULL,
	"votes" integer NOT NULL,
	"requester" varchar(120),
	"answer_link" varchar(255),
	"created_by" integer,
	"updated_by" integer,
	"deleted_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "doubts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.trails (
	"id" serial NOT NULL,
	"name" varchar(80) NOT NULL,
	"title" varchar(200) NOT NULL,
	"link" varchar(200) NOT NULL UNIQUE,
	"created_by" integer,
	"updated_by" integer,
	"deleted_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "trails_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.mentorships (
	"id" serial NOT NULL,
	"owner" integer NOT NULL,
	"link" varchar(200) NOT NULL UNIQUE,
	"time_start" TIME,
	"time_end" TIME,
	"day_week" integer UNIQUE,
	"created_by" integer,
	"updated_by" integer,
	"deleted_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "mentorships_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.logins (
	"id" serial NOT NULL,
	"username" varchar(255) UNIQUE,
	"password" varchar(255) NOT NULL,
	"user" integer NOT NULL UNIQUE,
	"created_by" integer,
	"updated_by" integer,
	"deleted_by" integer,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "logins_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk2" FOREIGN KEY ("deleted_by") REFERENCES "users"("id");

ALTER TABLE "news" ADD CONSTRAINT "news_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "news" ADD CONSTRAINT "news_fk1" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "news" ADD CONSTRAINT "news_fk2" FOREIGN KEY ("deleted_by") REFERENCES "users"("id");

ALTER TABLE "navigations" ADD CONSTRAINT "navigations_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "navigations" ADD CONSTRAINT "navigations_fk1" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "navigations" ADD CONSTRAINT "navigations_fk2" FOREIGN KEY ("deleted_by") REFERENCES "users"("id");

ALTER TABLE "doubts" ADD CONSTRAINT "doubts_fk0" FOREIGN KEY ("trail") REFERENCES "trails"("id");
ALTER TABLE "doubts" ADD CONSTRAINT "doubts_fk1" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "doubts" ADD CONSTRAINT "doubts_fk2" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "doubts" ADD CONSTRAINT "doubts_fk3" FOREIGN KEY ("deleted_by") REFERENCES "users"("id");

ALTER TABLE "trails" ADD CONSTRAINT "trails_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "trails" ADD CONSTRAINT "trails_fk1" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "trails" ADD CONSTRAINT "trails_fk2" FOREIGN KEY ("deleted_by") REFERENCES "users"("id");

ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_fk0" FOREIGN KEY ("owner") REFERENCES "users"("id");
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_fk1" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_fk2" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_fk3" FOREIGN KEY ("deleted_by") REFERENCES "users"("id");

ALTER TABLE "logins" ADD CONSTRAINT "logins_fk0" FOREIGN KEY ("user") REFERENCES "users"("id");
ALTER TABLE "logins" ADD CONSTRAINT "logins_fk1" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "logins" ADD CONSTRAINT "logins_fk2" FOREIGN KEY ("updated_by") REFERENCES "users"("id");
ALTER TABLE "logins" ADD CONSTRAINT "logins_fk3" FOREIGN KEY ("deleted_by") REFERENCES "users"("id");







