-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 31, 2022 at 01:29 AM
-- Server version: 8.0.27-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_masrapt`
--
CREATE DATABASE IF NOT EXISTS `db_masrapt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_masrapt`;

-- --------------------------------------------------------

--
-- Table structure for table `bus`
--

CREATE TABLE `bus` (
  `id` int NOT NULL,
  `registration_plate` varchar(70) NOT NULL,
  `current_sequence_number` int DEFAULT NULL,
  `longitude` decimal(30,20) NOT NULL,
  `latitude` decimal(30,20) DEFAULT NULL,
  `state` tinyint(1) NOT NULL,
  `id_route` int NOT NULL,
  `route_color` varchar(255) NOT NULL,
  `passengers_number` int NOT NULL,
  `in_a_bus_stop` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `bus`
--

INSERT INTO `bus` (`id`, `registration_plate`, `current_sequence_number`, `longitude`, `latitude`, `state`, `id_route`, `route_color`, `passengers_number`, `in_a_bus_stop`) VALUES
(11, 'SV-35-TA', 24, '16.88554121925686000000', '-24.97875340666548000000', 1, 11, 'blue', 4, 1),
(12, 'SV-45-FA', 76, '16.88687031726800000000', '-24.98927830290754000000', 1, 12, 'red', 27, 1),
(13, 'SV-74-DB', 59, '16.88364380445579000000', '-24.98663680793663000000', 1, 13, 'green', 6, 1),
(14, 'SV-32-FR', 44, '16.89066091671846000000', '-24.98429388624523000000', 1, 11, 'blue', 7, 0),
(15, 'SV-82-PD', 14, '16.88323307468260000000', '-24.98969271226329000000', 1, 13, 'green', 17, 0);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `active_bus` int NOT NULL,
  `route_timer` int NOT NULL,
  `locations` varchar(355) DEFAULT NULL,
  `route_color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `name`, `description`, `active_bus`, `route_timer`, `locations`, `route_color`) VALUES
(11, 'Route L1', '', 5, 50, 'Maderanzinho - Cruz - Bela Vista - Liceu Velho', 'blue'),
(12, 'Route L2', '', 5, 50, 'Maderanzinho - Cruz - Bela Vista - Liceu Velho', 'red'),
(13, 'Route L3', '', 5, 50, 'Maderanzinho - Cruz - Bela Vista - Liceu Velho', 'green'),
(15, 'Route L10', '', 54, 530, 'blablablablablablab', '');

-- --------------------------------------------------------

--
-- Table structure for table `routes_coordinates`
--

CREATE TABLE `routes_coordinates` (
  `id_coordinates` int NOT NULL,
  `sequence_number` int NOT NULL,
  `longitude` decimal(30,20) NOT NULL,
  `latitude` decimal(30,20) DEFAULT NULL,
  `altitude` decimal(30,20) DEFAULT NULL,
  `id_route` int NOT NULL,
  `is_a_bus_stop` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `routes_coordinates`
--

INSERT INTO `routes_coordinates` (`id_coordinates`, `sequence_number`, `longitude`, `latitude`, `altitude`, `id_route`, `is_a_bus_stop`) VALUES
(3, 1, '16.88606433352687000000', '-24.98629148762652000000', '0.00000000000000000000', 11, 1),
(4, 2, '16.88581641052961000000', '-24.98632020492875000000', '0.00000000000000000000', 11, 0),
(5, 3, '16.88553631093369000000', '-24.98637987539332000000', '0.00000000000000000000', 11, 0),
(6, 4, '16.88533401122892000000', '-24.98643186094823000000', '0.00000000000000000000', 11, 0),
(7, 5, '16.88526428921780000000', '-24.98615465095456000000', '0.00000000000000000000', 11, 1),
(8, 6, '16.88559617763656000000', '-24.98607147102824000000', '0.00000000000000000000', 11, 0),
(9, 7, '16.88597070890412000000', '-24.98599768512697000000', '0.00000000000000000000', 11, 0),
(10, 8, '16.88590797133129000000', '-24.98553279651804000000', '0.00000000000000000000', 11, 0),
(11, 9, '16.88585291771152000000', '-24.98517512473801000000', '0.00000000000000000000', 11, 0),
(12, 10, '16.88579069520526000000', '-24.98464214963741000000', '0.00000000000000000000', 11, 1),
(13, 11, '16.88574995479092000000', '-24.98414048675458000000', '0.00000000000000000000', 11, 0),
(14, 12, '16.88578203322842000000', '-24.98373642886931000000', '0.00000000000000000000', 11, 0),
(15, 13, '16.88568609601361000000', '-24.98337623528259000000', '0.00000000000000000000', 11, 0),
(16, 14, '16.88564044608639000000', '-24.98294926679576000000', '0.00000000000000000000', 11, 0),
(17, 15, '16.88570488281033000000', '-24.98249928125145000000', '0.00000000000000000000', 11, 1),
(18, 16, '16.88563831017057000000', '-24.98202169716476000000', '0.00000000000000000000', 11, 0),
(19, 17, '16.88558714627003000000', '-24.98157753572666000000', '0.00000000000000000000', 11, 0),
(20, 18, '16.88548401758224000000', '-24.98119665572729000000', '0.00000000000000000000', 11, 0),
(21, 19, '16.88533983441716000000', '-24.98075353452506000000', '0.00000000000000000000', 11, 1),
(22, 20, '16.88526209428177000000', '-24.98033635761292000000', '0.00000000000000000000', 11, 0),
(23, 21, '16.88529972772972000000', '-24.97989955835940000000', '0.00000000000000000000', 11, 0),
(24, 22, '16.88540237050413000000', '-24.97945021004677000000', '0.00000000000000000000', 11, 0),
(25, 23, '16.88551128443155000000', '-24.97906857056980000000', '0.00000000000000000000', 11, 0),
(26, 24, '16.88554121925686000000', '-24.97875340666548000000', '0.00000000000000000000', 11, 1),
(27, 25, '16.88595822755225000000', '-24.97892936082148000000', '0.00000000000000000000', 11, 0),
(28, 26, '16.88643653974191000000', '-24.97916557852084000000', '0.00000000000000000000', 11, 0),
(29, 27, '16.88692096373541000000', '-24.97936736850087000000', '0.00000000000000000000', 11, 0),
(30, 28, '16.88736685409554000000', '-24.97960758171477000000', '0.00000000000000000000', 11, 0),
(31, 29, '16.88780704862690000000', '-24.97978323208909000000', '0.00000000000000000000', 11, 0),
(32, 30, '16.88826150395278000000', '-24.97997844643842000000', '0.00000000000000000000', 11, 1),
(33, 31, '16.88880352472110000000', '-24.98016315581063000000', '0.00000000000000000000', 11, 0),
(34, 32, '16.88938646881791000000', '-24.98041066495050000000', '0.00000000000000000000', 11, 0),
(35, 33, '16.88999417836212000000', '-24.98062202335055000000', '0.00000000000000000000', 11, 0),
(36, 34, '16.89072916484070000000', '-24.98090234689600000000', '0.00000000000000000000', 11, 0),
(37, 35, '16.89123301822837000000', '-24.98116298873003000000', '0.00000000000000000000', 11, 0),
(38, 36, '16.89163837120334000000', '-24.98157596686816000000', '0.00000000000000000000', 11, 0),
(39, 37, '16.89190934107216000000', '-24.98198806546086000000', '0.00000000000000000000', 11, 1),
(40, 38, '16.89212972304748000000', '-24.98245862079255000000', '0.00000000000000000000', 11, 0),
(41, 39, '16.89221675684880000000', '-24.98280073105160000000', '0.00000000000000000000', 11, 0),
(42, 40, '16.89225691027207000000', '-24.98313422688832000000', '0.00000000000000000000', 11, 0),
(43, 41, '16.89173061369002000000', '-24.98338524617670000000', '0.00000000000000000000', 11, 0),
(44, 42, '16.89129634978105000000', '-24.98366467503281000000', '0.00000000000000000000', 11, 0),
(45, 43, '16.89093946483473000000', '-24.98393605795271000000', '0.00000000000000000000', 11, 0),
(46, 44, '16.89066091671846000000', '-24.98429388624523000000', '0.00000000000000000000', 11, 0),
(47, 45, '16.89074888536842000000', '-24.98472330656572000000', '0.00000000000000000000', 11, 1),
(48, 46, '16.89115671313244000000', '-24.98500182113498000000', '0.00000000000000000000', 11, 0),
(49, 47, '16.89152370365731000000', '-24.98530962442400000000', '0.00000000000000000000', 11, 0),
(50, 48, '16.89187568745040000000', '-24.98573375765937000000', '0.00000000000000000000', 11, 1),
(51, 49, '16.89210993385963000000', '-24.98620898344038000000', '0.00000000000000000000', 11, 0),
(52, 50, '16.89229603435444000000', '-24.98652665903384000000', '0.00000000000000000000', 11, 0),
(53, 51, '16.89242468983358000000', '-24.98705194482634000000', '0.00000000000000000000', 11, 0),
(54, 52, '16.89250231489389000000', '-24.98766162191514000000', '0.00000000000000000000', 11, 1),
(55, 53, '16.89260630086517000000', '-24.98830968928252000000', '0.00000000000000000000', 11, 0),
(56, 54, '16.89267817779694000000', '-24.98901208721236000000', '0.00000000000000000000', 11, 0),
(57, 55, '16.89278643749336000000', '-24.98985265049949000000', '0.00000000000000000000', 11, 0),
(58, 56, '16.89293094874364000000', '-24.99074454443494000000', '0.00000000000000000000', 11, 0),
(59, 57, '16.89304835435065000000', '-24.99150497502455000000', '0.00000000000000000000', 11, 0),
(60, 58, '16.89326860013824000000', '-24.99225947588120000000', '0.00000000000000000000', 11, 0),
(61, 59, '16.89292803652718000000', '-24.99273933038166000000', '0.00000000000000000000', 11, 0),
(62, 60, '16.89243140949482000000', '-24.99324198585118000000', '0.00000000000000000000', 11, 1),
(63, 61, '16.89190562334231000000', '-24.99347722886432000000', '0.00000000000000000000', 11, 0),
(64, 62, '16.89143254093050000000', '-24.99380321046601000000', '0.00000000000000000000', 11, 0),
(65, 63, '16.89080703054731000000', '-24.99407489978546000000', '0.00000000000000000000', 11, 0),
(66, 64, '16.89003571575983000000', '-24.99385845500998000000', '0.00000000000000000000', 11, 0),
(67, 65, '16.88937948990977000000', '-24.99343087793348000000', '0.00000000000000000000', 11, 0),
(68, 66, '16.88914869239382000000', '-24.99274955752854000000', '0.00000000000000000000', 11, 0),
(69, 67, '16.88895305967430000000', '-24.99197501436225000000', '0.00000000000000000000', 11, 0),
(70, 68, '16.88895698896350000000', '-24.99133637302979000000', '0.00000000000000000000', 11, 0),
(71, 69, '16.88898404469682000000', '-24.99065012487826000000', '0.00000000000000000000', 11, 0),
(72, 70, '16.88875038926453000000', '-24.98998569556430000000', '0.00000000000000000000', 11, 1),
(73, 71, '16.88826652071406000000', '-24.98952557865027000000', '0.00000000000000000000', 11, 0),
(74, 72, '16.88751054695956000000', '-24.98926109566973000000', '0.00000000000000000000', 11, 0),
(75, 73, '16.88660775508751000000', '-24.98919713190032000000', '0.00000000000000000000', 11, 0),
(76, 74, '16.88681332070872000000', '-24.98886484821954000000', '0.00000000000000000000', 11, 0),
(77, 75, '16.88669071256902000000', '-24.98825869437910000000', '0.00000000000000000000', 11, 0),
(78, 76, '16.88660867320069000000', '-24.98786369709445000000', '0.00000000000000000000', 11, 0),
(79, 77, '16.88651818608574000000', '-24.98745598056123000000', '0.00000000000000000000', 11, 0),
(80, 78, '16.88626012761841000000', '-24.98723352237617000000', '0.00000000000000000000', 11, 0),
(81, 79, '16.88615710836407000000', '-24.98683509111975000000', '0.00000000000000000000', 11, 1),
(82, 80, '16.88606433352687000000', '-24.98629148762652000000', '0.00000000000000000000', 11, 0),
(83, 1, '16.88339577650514000000', '-24.99010731214204000000', '0.00000000000000000000', 12, 0),
(84, 2, '16.88309142817492000000', '-24.98935388394678000000', '0.00000000000000000000', 12, 0),
(85, 3, '16.88286303026812000000', '-24.98865814534707000000', '0.00000000000000000000', 12, 0),
(86, 4, '16.88345587090420000000', '-24.98814731248727000000', '0.00000000000000000000', 12, 0),
(87, 5, '16.88387499290745000000', '-24.98781040206401000000', '0.00000000000000000000', 12, 1),
(88, 6, '16.88442050686252000000', '-24.98744753172662000000', '0.00000000000000000000', 12, 0),
(89, 7, '16.88485072225428000000', '-24.98727734465026000000', '0.00000000000000000000', 12, 0),
(90, 8, '16.88516073907682000000', '-24.98698451034955000000', '0.00000000000000000000', 12, 0),
(91, 9, '16.88541326667150000000', '-24.98668487412288000000', '0.00000000000000000000', 12, 0),
(92, 10, '16.88531497406630000000', '-24.98632126666091000000', '0.00000000000000000000', 12, 0),
(93, 11, '16.88561125257653000000', '-24.98606290657146000000', '0.00000000000000000000', 12, 0),
(94, 12, '16.88592372472549000000', '-24.98598813668758000000', '0.00000000000000000000', 12, 1),
(95, 13, '16.88583718188046000000', '-24.98537116556903000000', '0.00000000000000000000', 12, 0),
(96, 14, '16.88598601060839000000', '-24.98536977660699000000', '0.00000000000000000000', 12, 0),
(97, 15, '16.88605168033196000000', '-24.98606939933761000000', '0.00000000000000000000', 12, 0),
(98, 16, '16.88610393484720000000', '-24.98676570654844000000', '0.00000000000000000000', 12, 1),
(99, 17, '16.88631270327691000000', '-24.98726255599238000000', '0.00000000000000000000', 12, 0),
(100, 18, '16.88674059694585000000', '-24.98719181955182000000', '0.00000000000000000000', 12, 0),
(101, 19, '16.88725411610161000000', '-24.98707277354506000000', '0.00000000000000000000', 12, 0),
(102, 20, '16.88771985102677000000', '-24.98695464092336000000', '0.00000000000000000000', 12, 0),
(103, 21, '16.88836160755481000000', '-24.98677945461188000000', '0.00000000000000000000', 12, 0),
(104, 22, '16.88894809508258000000', '-24.98665595964918000000', '0.00000000000000000000', 12, 0),
(105, 23, '16.88957275905836000000', '-24.98645465717390000000', '0.00000000000000000000', 12, 0),
(106, 24, '16.89009948417031000000', '-24.98633113179454000000', '0.00000000000000000000', 12, 1),
(107, 25, '16.89065782505036000000', '-24.98620107356013000000', '0.00000000000000000000', 12, 0),
(108, 26, '16.89126745962405000000', '-24.98600163994818000000', '0.00000000000000000000', 12, 0),
(109, 27, '16.89174370986302000000', '-24.98588974657231000000', '0.00000000000000000000', 12, 0),
(110, 28, '16.89184373246959000000', '-24.98566216745914000000', '0.00000000000000000000', 12, 1),
(111, 29, '16.89206359986671000000', '-24.98511342555617000000', '0.00000000000000000000', 12, 0),
(112, 30, '16.89245851613505000000', '-24.98480197794389000000', '0.00000000000000000000', 12, 0),
(113, 31, '16.89277242789669000000', '-24.98466433215106000000', '0.00000000000000000000', 12, 1),
(114, 32, '16.89317852963801000000', '-24.98454214451486000000', '0.00000000000000000000', 12, 0),
(115, 33, '16.89362599430400000000', '-24.98446492985767000000', '0.00000000000000000000', 12, 0),
(116, 34, '16.89377620396163000000', '-24.98447188254413000000', '0.00000000000000000000', 12, 0),
(117, 35, '16.89391550132764000000', '-24.98501734764052000000', '0.00000000000000000000', 12, 0),
(118, 36, '16.89436394817355000000', '-24.98500887052441000000', '0.00000000000000000000', 12, 0),
(119, 37, '16.89470874202308000000', '-24.98471992013152000000', '0.00000000000000000000', 12, 0),
(120, 38, '16.89502131476559000000', '-24.98434765752098000000', '0.00000000000000000000', 12, 0),
(121, 39, '16.89530012394263000000', '-24.98418718313390000000', '0.00000000000000000000', 12, 1),
(122, 40, '16.89565207646869000000', '-24.98453335686518000000', '0.00000000000000000000', 12, 0),
(123, 41, '16.89608830707524000000', '-24.98489844148363000000', '0.00000000000000000000', 12, 0),
(124, 42, '16.89646011565157000000', '-24.98528215936853000000', '0.00000000000000000000', 12, 0),
(125, 43, '16.89687931750748000000', '-24.98565983741402000000', '0.00000000000000000000', 12, 1),
(126, 44, '16.89724834393586000000', '-24.98588303246966000000', '0.00000000000000000000', 12, 0),
(127, 45, '16.89774294090637000000', '-24.98574262401132000000', '0.00000000000000000000', 12, 0),
(128, 46, '16.89823941326708000000', '-24.98550182728033000000', '0.00000000000000000000', 12, 1),
(129, 47, '16.89846484932111000000', '-24.98533735681728000000', '0.00000000000000000000', 12, 0),
(130, 48, '16.89877337106743000000', '-24.98526965272827000000', '0.00000000000000000000', 12, 0),
(131, 49, '16.89897259821982000000', '-24.98545911209493000000', '0.00000000000000000000', 12, 0),
(132, 50, '16.89892417347086000000', '-24.98609811596852000000', '0.00000000000000000000', 12, 0),
(133, 51, '16.89880937782372000000', '-24.98675223518338000000', '0.00000000000000000000', 12, 0),
(134, 52, '16.89872500863527000000', '-24.98731012026584000000', '0.00000000000000000000', 12, 0),
(135, 53, '16.89865888480534000000', '-24.98799104654323000000', '0.00000000000000000000', 12, 1),
(136, 54, '16.89847230900579000000', '-24.98855857140502000000', '0.00000000000000000000', 12, 0),
(137, 55, '16.89820910270704000000', '-24.98911950872496000000', '0.00000000000000000000', 12, 0),
(138, 56, '16.89797608617067000000', '-24.98965587393855000000', '0.00000000000000000000', 12, 0),
(139, 57, '16.89753791462941000000', '-24.99057705269678000000', '0.00000000000000000000', 12, 1),
(140, 58, '16.89693959407899000000', '-24.99082708480100000000', '0.00000000000000000000', 12, 0),
(141, 59, '16.89632012584708000000', '-24.99123709056666000000', '0.00000000000000000000', 12, 0),
(142, 60, '16.89586108880970000000', '-24.99164184984541000000', '0.00000000000000000000', 12, 0),
(143, 61, '16.89517521857636000000', '-24.99193025815596000000', '0.00000000000000000000', 12, 0),
(144, 62, '16.89462740694351000000', '-24.99212362330487000000', '0.00000000000000000000', 12, 1),
(145, 63, '16.89375841710797000000', '-24.99229579524396000000', '0.00000000000000000000', 12, 0),
(146, 64, '16.89314743649970000000', '-24.99255757687489000000', '0.00000000000000000000', 12, 0),
(147, 65, '16.89229774717582000000', '-24.99317767278684000000', '0.00000000000000000000', 12, 0),
(148, 66, '16.89158362470325000000', '-24.99365593552766000000', '0.00000000000000000000', 12, 0),
(149, 67, '16.89081732244271000000', '-24.99405090678174000000', '0.00000000000000000000', 12, 1),
(150, 68, '16.89007895603264000000', '-24.99387746750380000000', '0.00000000000000000000', 12, 0),
(151, 69, '16.88946548402488000000', '-24.99334974055349000000', '0.00000000000000000000', 12, 0),
(152, 70, '16.88905644362704000000', '-24.99234931970395000000', '0.00000000000000000000', 12, 0),
(153, 71, '16.88894965439444000000', '-24.99137828539993000000', '0.00000000000000000000', 12, 0),
(154, 72, '16.88894015265435000000', '-24.99047110509387000000', '0.00000000000000000000', 12, 1),
(155, 73, '16.88855904351282000000', '-24.98972919131076000000', '0.00000000000000000000', 12, 0),
(156, 74, '16.88795978302884000000', '-24.98939024178096000000', '0.00000000000000000000', 12, 0),
(157, 75, '16.88729960786499000000', '-24.98926170556767000000', '0.00000000000000000000', 12, 0),
(158, 76, '16.88687031726800000000', '-24.98927830290754000000', '0.00000000000000000000', 12, 1),
(159, 77, '16.88632070559103000000', '-24.98928480824429000000', '0.00000000000000000000', 12, 0),
(160, 78, '16.88581081101212000000', '-24.98933887690859000000', '0.00000000000000000000', 12, 0),
(161, 79, '16.88528834985533000000', '-24.98946481762890000000', '0.00000000000000000000', 12, 0),
(162, 80, '16.88474460883993000000', '-24.98964399825270000000', '0.00000000000000000000', 12, 0),
(163, 81, '16.88411748588440000000', '-24.98984911048568000000', '0.00000000000000000000', 12, 1),
(164, 82, '16.88339577650514000000', '-24.99010731214204000000', '0.00000000000000000000', 12, 0),
(165, 1, '16.88562900206418000000', '-24.98646194341872000000', '0.00000000000000000000', 13, 0),
(166, 2, '16.88604830336415000000', '-24.98606172793679000000', '0.00000000000000000000', 13, 1),
(167, 3, '16.88613746317504000000', '-24.98661064992312000000', '0.00000000000000000000', 13, 0),
(168, 4, '16.88631587338471000000', '-24.98734042481583000000', '0.00000000000000000000', 13, 0),
(169, 5, '16.88655923197705000000', '-24.98760046889436000000', '0.00000000000000000000', 13, 0),
(170, 6, '16.88673852449060000000', '-24.98842998122516000000', '0.00000000000000000000', 13, 1),
(171, 7, '16.88682070521176000000', '-24.98906328335739000000', '0.00000000000000000000', 13, 0),
(172, 8, '16.88645070240512000000', '-24.98924937945331000000', '0.00000000000000000000', 13, 0),
(173, 9, '16.88594252809708000000', '-24.98927529507553000000', '0.00000000000000000000', 13, 0),
(174, 10, '16.88538059311944000000', '-24.98941009412679000000', '0.00000000000000000000', 13, 0),
(175, 11, '16.88474261416841000000', '-24.98963423084001000000', '0.00000000000000000000', 13, 0),
(176, 12, '16.88421417705662000000', '-24.98981964175229000000', '0.00000000000000000000', 13, 0),
(177, 13, '16.88361399463777000000', '-24.99003922186337000000', '0.00000000000000000000', 13, 1),
(178, 14, '16.88323307468260000000', '-24.98969271226329000000', '0.00000000000000000000', 13, 0),
(179, 15, '16.88302219053354000000', '-24.98909277115184000000', '0.00000000000000000000', 13, 0),
(180, 16, '16.88284031947454000000', '-24.98856044847816000000', '0.00000000000000000000', 13, 0),
(181, 17, '16.88265228098728000000', '-24.98807259430045000000', '0.00000000000000000000', 13, 0),
(182, 18, '16.88219139822911000000', '-24.98771460334859000000', '0.00000000000000000000', 13, 1),
(183, 19, '16.88163909827321000000', '-24.98748693717013000000', '0.00000000000000000000', 13, 0),
(184, 20, '16.88104021493959000000', '-24.98735942081671000000', '0.00000000000000000000', 13, 0),
(185, 21, '16.88048888052272000000', '-24.98760626633458000000', '0.00000000000000000000', 13, 0),
(186, 22, '16.87978380835639000000', '-24.98789816951712000000', '0.00000000000000000000', 13, 0),
(187, 23, '16.87918422305658000000', '-24.98819617634860000000', '0.00000000000000000000', 13, 1),
(188, 24, '16.87857076365088000000', '-24.98851096280102000000', '0.00000000000000000000', 13, 0),
(189, 25, '16.87771999879102000000', '-24.98887755676631000000', '0.00000000000000000000', 13, 0),
(190, 26, '16.87703812987048000000', '-24.98929382123301000000', '0.00000000000000000000', 13, 0),
(191, 27, '16.87620647290203000000', '-24.98976851829278000000', '0.00000000000000000000', 13, 1),
(192, 28, '16.87503466912086000000', '-24.99033461502972000000', '0.00000000000000000000', 13, 0),
(193, 29, '16.87366829296922000000', '-24.99062325292433000000', '0.00000000000000000000', 13, 0),
(194, 30, '16.87236115745785000000', '-24.99085017891830000000', '0.00000000000000000000', 13, 0),
(195, 31, '16.87208986433749000000', '-24.98979428383684000000', '0.00000000000000000000', 13, 0),
(196, 32, '16.87192681956205000000', '-24.98924023185810000000', '0.00000000000000000000', 13, 1),
(197, 33, '16.87280913162169000000', '-24.98896956040350000000', '0.00000000000000000000', 13, 0),
(198, 34, '16.87339568148898000000', '-24.98886612740751000000', '0.00000000000000000000', 13, 0),
(199, 35, '16.87439900066825000000', '-24.98863543808125000000', '0.00000000000000000000', 13, 1),
(200, 36, '16.87470063563034000000', '-24.98897541928934000000', '0.00000000000000000000', 13, 0),
(201, 37, '16.87572785589519000000', '-24.98884450919243000000', '0.00000000000000000000', 13, 0),
(202, 38, '16.87588948960564000000', '-24.98802555271449000000', '0.00000000000000000000', 13, 0),
(203, 39, '16.87592899222503000000', '-24.98743605930835000000', '0.00000000000000000000', 13, 0),
(204, 40, '16.87552289777644000000', '-24.98720134424565000000', '0.00000000000000000000', 13, 1),
(205, 41, '16.87563428334343000000', '-24.98683191454369000000', '0.00000000000000000000', 13, 0),
(206, 42, '16.87660744878169000000', '-24.98611136034203000000', '0.00000000000000000000', 13, 0),
(207, 43, '16.87731788042954000000', '-24.98555375755317000000', '0.00000000000000000000', 13, 0),
(208, 44, '16.87795325370819000000', '-24.98508016225288000000', '0.00000000000000000000', 13, 0),
(209, 45, '16.87862525202783000000', '-24.98456596865687000000', '0.00000000000000000000', 13, 0),
(210, 46, '16.87939441067304000000', '-24.98393258625296000000', '0.00000000000000000000', 13, 1),
(211, 47, '16.88018534606585000000', '-24.98345340811576000000', '0.00000000000000000000', 13, 0),
(212, 48, '16.88090532503888000000', '-24.98309570318550000000', '0.00000000000000000000', 13, 0),
(213, 49, '16.88205398885236000000', '-24.98228282605319000000', '0.00000000000000000000', 13, 0),
(214, 50, '16.88197670380399000000', '-24.98199094246121000000', '0.00000000000000000000', 13, 0),
(215, 51, '16.88221134425819000000', '-24.98186351274819000000', '0.00000000000000000000', 13, 1),
(216, 52, '16.88232593352581000000', '-24.98218886892400000000', '0.00000000000000000000', 13, 0),
(217, 53, '16.88247852705121000000', '-24.98292572693677000000', '0.00000000000000000000', 13, 0),
(218, 54, '16.88273495621657000000', '-24.98365596698388000000', '0.00000000000000000000', 13, 0),
(219, 55, '16.88300939824487000000', '-24.98450971621313000000', '0.00000000000000000000', 13, 0),
(220, 56, '16.88316472279283000000', '-24.98513295355844000000', '0.00000000000000000000', 13, 1),
(221, 57, '16.88335753348409000000', '-24.98578935650636000000', '0.00000000000000000000', 13, 0),
(222, 58, '16.88354230637747000000', '-24.98639620658496000000', '0.00000000000000000000', 13, 0),
(223, 59, '16.88364380445579000000', '-24.98663680793663000000', '0.00000000000000000000', 13, 1),
(224, 60, '16.88380975962628000000', '-24.98717981588157000000', '0.00000000000000000000', 13, 0),
(225, 61, '16.88407766516813000000', '-24.98758362055947000000', '0.00000000000000000000', 13, 0),
(226, 62, '16.88472196592175000000', '-24.98750374723166000000', '0.00000000000000000000', 13, 0),
(227, 63, '16.88511260881046000000', '-24.98714269963980000000', '0.00000000000000000000', 13, 1),
(228, 64, '16.88562900206418000000', '-24.98646194341872000000', '0.00000000000000000000', 13, 0);

-- --------------------------------------------------------

--
-- Table structure for table `route_color`
--

CREATE TABLE `route_color` (
  `route_color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(250) NOT NULL,
  `name` varchar(100) NOT NULL,
  `hash_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `hash_password`) VALUES
(8, 'rmedina@uta.cv', 'Roberto Carlos', '1234567'),
(9, 'rmedina@uta.cv', 'Roberto Carlos', '1234567');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_route` (`id_route`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routes_coordinates`
--
ALTER TABLE `routes_coordinates`
  ADD PRIMARY KEY (`id_coordinates`),
  ADD KEY `id_route` (`id_route`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bus`
--
ALTER TABLE `bus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `routes_coordinates`
--
ALTER TABLE `routes_coordinates`
  MODIFY `id_coordinates` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bus`
--
ALTER TABLE `bus`
  ADD CONSTRAINT `bus_ibfk_1` FOREIGN KEY (`id_route`) REFERENCES `routes` (`id`);

--
-- Constraints for table `routes_coordinates`
--
ALTER TABLE `routes_coordinates`
  ADD CONSTRAINT `routes_coordinates_ibfk_1` FOREIGN KEY (`id_route`) REFERENCES `routes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;