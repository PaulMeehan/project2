-- USE project2_dev;

-- INSERT INTO Users (firstName, lastName, email, password, isAdmin)
-- VALUES ("Jane", "Jobs", "j@j.co", "$2b$10$afGmlGCU0AGEzZBILPyPWOfSclxjMxKocB8QXv8CqhN73IHUUp7Gi", false);

-- INSERT INTO stores (storeName, email, hours, address, url, createdAt, updatedAt) values 
-- ("Bob's Bike Rack", "bobsmith@xmail.com", "9:00 - 5:00 Mon-Sat", "123 Main St. Durham NC 27715", "http://www.bobsbikerack.com", now(), now()),
-- ("Outdoor Adventures", "adventuresawait@xmail.com", "9:00 - 9:00 Mon-Fri, 9:00 - 6:00 Sat", "33 Clark St. Cary NC 27519", "http://www.outdooradventures.com", now(), now()),
-- ("Health And Fitness", "haf@xmail.com", "6:00 - 5:00 Mon-Sat", "100 Kildaire Farms Rd. Cary NC 27511", "http://www.healthandfitness.com", now(), now());

-- INSERT INTO inventories (itemName, category, description, price, StoreId, createdAt, updatedAt) values 
-- ("Schwinn S150", "touring", "27 inch, 12 speed touring bike", 175.00, 1, now(), now()),
-- ("Roadmaster", "mountain", "24 inch girls mountain bike", 78.00, 1, now(), now()),
-- ("Huffy Parkside SE", "crusing", "Men's 7 speed comfort bike", 148.00, 1, now(), now()),
-- ("Hobie Mirage Pro Angler 14", "kayaks", "Exreme fishing utility with 6 horizontal rod lockers", 500.00, 2, now(), now()),
-- ("10' Ace Tec Performer", "paddle boards", "Bic Ace Tec Performer", 879.00, 2, now(), now()),
-- ("Schwinn S150", "bikes", "27 inch, 12 speed men's touring bike", 158.00, 2, now(), now()),
-- ("True Fitness Recumbent Bike PS50", "stationary bikes", "Durable stationary bike accommodates users of all fitness levels", 2200.00, 3, now(), now()),
-- ("TRX Home Kit", "Suspension trainers", "TRXHOMEKIT uses body weight and gravity to perform over 300 exercises", 175.00, 3, now(), now()),
-- ("Garmin vivosmart", "health trackers", "Activity tracker plus smart notifications", 275.00, 3, now(), now());

-- INSERT INTO tags (description, createdAt, updatedAt) values 
-- ("bike", now(), now()),
-- ("outdoors", now(), now()),
-- ("exercise", now(), now()),
-- ("health", now(), now()),
-- ("indoors", now(), now()),
-- ("water", now(), now());

-- INSERT INTO inventorytag (inventoryId, tagId, createdAt, updatedAt) values 
-- (1,1, now(), now()),
-- (1,2, now(), now()),
-- (1,3, now(), now()),
-- (2,1, now(), now()),
-- (2,2, now(), now()),
-- (2,3, now(), now()),
-- (3,1, now(), now()),
-- (4,2, now(), now()),
-- (4,6, now(), now()),
-- (5,2, now(), now()),
-- (5,6, now(), now()),
-- (6,1, now(), now()),
-- (6,2, now(), now()),
-- (6,4, now(), now()),
-- (7,1, now(), now()),
-- (7,5, now(), now()),
-- (8,3, now(), now()),
-- (8,4, now(), now()),
-- (9,3, now(), now()),
-- (9,4, now(), now());

-- INSERT INTO Users (firstName, lastName, email, password, isAdmin, isStore, storeId)
-- VALUES ("Joe", "Gates", "j@g.co", "$2b$10$afGmlGCU0AGEzZBILPyPWOfSclxjMxKocB8QXv8CqhN73IHUUp7Gi", true, true, 1);
