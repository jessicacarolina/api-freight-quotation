create table public.quote (
	id serial primary key,
	name text,
	service text,
	deadline integer,
	price float, 
	dispatcher_id text
);