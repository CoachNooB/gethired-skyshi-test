export class Config {
    public port = process.env.NODE_PORT || "3030"
    

    // DB CONFIG
    public dbType = process.env.DB_TYPE || "mysql";
    public dbName = process.env.MYSQL_DBNAME || "todo";
    public dbHost = process.env.MYSQL_HOST || "localhost";
    public dbPort = process.env.MYSQL_PORT || "3306";
    public dbUser = process.env.MYSQL_USER || "root";
    public dbPass = process.env.MYSQL_PASSWORD || "SomeSecurePassword";
}