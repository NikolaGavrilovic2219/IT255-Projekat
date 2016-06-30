-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2016 at 07:16 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servis`
--

-- --------------------------------------------------------

--
-- Table structure for table `deo`
--

CREATE TABLE `deo` (
  `ID` int(11) NOT NULL,
  `NAZIV` varchar(128) NOT NULL,
  `PROIZVODJAC` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deo`
--

INSERT INTO `deo` (`ID`, `NAZIV`, `PROIZVODJAC`) VALUES
(1, 'Gume 195/65/R15', 'Pirelli'),
(2, 'Gume 205/65/R16', 'Pirelli'),
(3, 'Homokineticki zglob', 'Champion'),
(4, 'Homokineticki zglob', 'KGN'),
(5, 'Homokineticki zglob', 'BANDO'),
(6, 'Amortizer prednji levi', 'Sachs'),
(7, 'Amortizer prednji levi', 'Eibach'),
(8, 'Amortizer prednji levi', 'Vertex'),
(9, 'Amortizer prednji desni', 'Vertex'),
(10, 'Amortizer prednji desni', 'Eibach'),
(11, 'Amortizer prednji desni', 'Sachs'),
(12, 'Zadnji amortizer', 'Eicbach'),
(13, 'Zadnji amortizer', 'Vertex'),
(14, 'Zadnji  amortizer', 'Sachs'),
(15, 'Gume 195/55/R15', 'Michelin'),
(16, 'Gume 235/50/R20', 'Michelin'),
(17, 'Prednje levo krilo', 'ICON'),
(18, 'Prednje desno krilo', 'ICON'),
(19, 'Felna 18" Shuriken', 'DOTZ'),
(20, 'Felna 20" Baan Velgen', 'OZ Racing');

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `ID` int(11) NOT NULL,
  `IME` varchar(128) NOT NULL,
  `PREZIME` varchar(128) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(256) NOT NULL,
  `TOKEN` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`ID`, `IME`, `PREZIME`, `USERNAME`, `PASSWORD`, `TOKEN`) VALUES
(1, 'nikola', 'nikola', 'nikola', '9365ea12b2d910e1aceaac190fbc97a5', '3971f6c663ff768f98dfe5ed7a14ecfa1466bc4f');

-- --------------------------------------------------------

--
-- Table structure for table `servis`
--

CREATE TABLE `servis` (
  `ID` int(11) NOT NULL,
  `DEO_ID` int(11) NOT NULL,
  `VRSTA` varchar(128) NOT NULL,
  `OPIS` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servis`
--

INSERT INTO `servis` (`ID`, `DEO_ID`, `VRSTA`, `OPIS`) VALUES
(2, 1, 'Zamena', 'Gume zamenjene nakon 15000km'),
(3, 7, 'Zamena', 'Promenjen je prednji levi amortizer koji je nakon 1000km pustio ulje. Cena : 2000 din/komad.'),
(4, 1, 'Duvanje guma', 'Sve cetiri gume su bile na 1.5 bar, bilo ih je potrebno doduvati na 2.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deo`
--
ALTER TABLE `deo`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `servis`
--
ALTER TABLE `servis`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_RELATIONSHIP_3` (`DEO_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deo`
--
ALTER TABLE `deo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `servis`
--
ALTER TABLE `servis`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `servis`
--
ALTER TABLE `servis`
  ADD CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`DEO_ID`) REFERENCES `deo` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
