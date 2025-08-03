SQL commands to Create and configure Database

1. Create the Manager database
CREATE DATABASE Manager;
Execute

2. USE Manager;
Execute

3. Create Personeels table
CREATE TABLE dbo.Personeels (
    SL INT IDENTITY(1,1) PRIMARY KEY,
    pName NVARCHAR(100) NOT NULL,
    eMail NVARCHAR(100)
);
Execute

4. Create tblRegistration table
CREATE TABLE dbo.tblRegistrations (
    Sl INT IDENTITY(1,1) PRIMARY KEY,
    iPersoneelSL INT NULL,
    iAnnouncementSL INT NULL,
    dRegistrationDate DATETIME NULL,
    vCategory NVARCHAR(255),
    iFees INT NULL,
    sPaymentMethod NVARCHAR(50),
    sStatus NVARCHAR(50),
    vPaymentType NVARCHAR(50),
    vTrxID NVARCHAR(50),
    vEntryBy NVARCHAR(50)
);
Execute

5. Create Announcements table
CREATE TABLE dbo.Announcements (
    SL INT IDENTITY(1,1) PRIMARY KEY,
    CourseSL INT NULL,
    Fees DECIMAL(10,2) NULL
);
Execute

6. Create TableCourseDetails table
CREATE TABLE dbo.TableCourseDetails (
    SL INT IDENTITY(1,1) PRIMARY KEY,
    CourseName NVARCHAR(100)
);
Execute

7. Create viwRegistration view
    CREATE VIEW dbo.viwRegistration AS
SELECT 
    r.Sl, 
    r.iPersoneelSL, 
    r.iAnnouncementSL, 
    p.pName, 
    p.eMail, 
    r.dRegistrationDate,
    c.CourseName, 
    r.iFees, 
    r.sStatus,
    r.vCourseName
FROM dbo.tblRegistrations r
LEFT JOIN dbo.Personeels p ON r.iPersoneelSL = p.SL
LEFT JOIN dbo.Announcements a ON r.iAnnouncementSL = a.SL
LEFT JOIN dbo.TableCourseDetails c ON a.CourseSL = c.SL;
Execute


//Please add some data to the Personeels and Announsments table before proceeding



