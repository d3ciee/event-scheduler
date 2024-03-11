CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL,
	`time` text,
	`created_at` integer NOT NULL,
	`created_by` text
);
--> statement-breakpoint
CREATE INDEX `search_idx` ON `event` (`title`,`description`);