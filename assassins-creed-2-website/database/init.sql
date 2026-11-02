-- Assassin's Creed II Database Initialization Script
CREATE DATABASE IF NOT EXISTS assassins_creed_ii;
USE assassins_creed_ii;

-- 1. Game Info Table
CREATE TABLE IF NOT EXISTS game_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    developer VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    release_year INT NOT NULL,
    platforms VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    hero_image VARCHAR(255) NOT NULL
);

-- 2. News Table
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Characters / Game Content Table
CREATE TABLE IF NOT EXISTS characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    faction VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

-- 5. Admin Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Initial Data Inserts
INSERT INTO game_info (title, developer, publisher, genre, release_year, platforms, description, hero_image)
VALUES (
    'Assassin''s Creed II',
    'Ubisoft Montreal',
    'Ubisoft',
    'Action-Adventure, Stealth',
    2009,
    'PC, PlayStation 3, Xbox 360, PS4, Xbox One, Nintendo Switch',
    'An epic story of family, vengeance, and conspiracy set in the pristine, yet brutal background of Renaissance Italy. Ezio Auditore da Firenze must master the deadly arts of the Assassins to avenge his betrayed family.',
    '/images/hero_ezio.jpg'
);

INSERT INTO news (category, title, short_description, content, image_url) VALUES
('Updates', 'The Legacy of Ezio Auditore', 'Discover how Ezio became one of the greatest Assassins in history.', 'Full article content describing Ezio Auditore da Firenze journey from a reckless Florentine youth to a Master Assassin leading the Italian Brotherhood...', '/images/placeholder.svg'),
('Lore', 'Secrets of the Codex Pages', 'Leonardo da Vinci helps decipher ancient secrets left by Altaïr.', 'Full article detailing Leonardo da Vinci deciphering the Codex Pages to upgrade Ezio''s armor, double hidden blade, and hidden gun...', '/images/placeholder.svg'),
('Guides', 'Mastering the Hidden Blade & Stealth', 'Essential combat and parkour techniques across Florence and Venice.', 'Detailed gameplay guide covering rooftop navigation, social stealth among crowds, leap of faith mechanics, and counter-attack timing...', '/images/placeholder.svg'),
('History', 'Florence and the Pazzi Conspiracy', 'The historical events behind the Medici vs Pazzi rivalry.', 'Historical analysis of 15th-century Florence, exploring how the game recreates real-world historical figures like Lorenzo de'' Medici and the Pazzi conspirators...', '/images/placeholder.svg'),
('Remaster', 'The Ezio Collection Visual Overview', 'Revisiting AC II with remastered textures and modern enhancements.', 'A deep dive into visual upgrades included in The Ezio Collection, comparing original 2009 visuals with modern 4K enhancements...', '/images/placeholder.svg');

INSERT INTO gallery (title, description, image_url) VALUES
('Florence Rooftops', 'Ezio overlooking Santa Maria del Fiore at dawn.', '/images/placeholder.svg'),
('Venetian Carnival', 'Social stealth and masks during Venice festivities.', '/images/placeholder.svg'),
('Leonardo''s Flying Machine', 'Gliding over the guards of Palazzo Ducale.', '/images/placeholder.svg'),
('Villa Auditore in Monteriggioni', 'The sanctuary and headquarters of the Brotherhood.', '/images/placeholder.svg'),
('The Vatican Vault', 'Confronting Rodrigo Borgia in Rome.', '/images/placeholder.svg');

INSERT INTO characters (name, role, faction, description, image_url) VALUES
('Ezio Auditore da Firenze', 'Master Assassin', 'Assassins', 'A Florentine nobleman who embarks on a quest for vengeance after his family is betrayed.', '/images/placeholder.svg'),
('Leonardo da Vinci', 'Genius Polymath & Ally', 'Assassins', 'Ezio''s lifelong friend who repairs Codex pages and invents advanced weaponry.', '/images/placeholder.svg'),
('Rodrigo Borgia', 'Grand Master Templar', 'Templars', 'The ruthless conspirator driving the Templar order to control all of Italy.', '/images/placeholder.svg');
