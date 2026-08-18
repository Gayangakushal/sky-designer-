<?php
declare(strict_types=1);

final class BlogDatabase
{
    private PDO|mysqli $connection;

    public function __construct()
    {
        require dirname(__DIR__) . '/db.php';
        $candidate = $pdo ?? $conn ?? $mysqli ?? null;
        if (!$candidate instanceof PDO && !$candidate instanceof mysqli) {
            throw new RuntimeException('Unsupported database connection.');
        }
        $this->connection = $candidate;
    }

    public function all(string $sql, string $types = '', array $params = []): array
    {
        if ($this->connection instanceof PDO) {
            $statement = $this->connection->prepare($sql);
            $statement->execute($params);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        $statement = $this->connection->prepare($sql);
        if (!$statement) throw new RuntimeException('Database operation failed.');
        if ($params) $statement->bind_param($types, ...$params);
        if (!$statement->execute()) throw new RuntimeException('Database operation failed.');
        return $statement->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function one(string $sql, string $types = '', array $params = []): ?array
    {
        return $this->all($sql, $types, $params)[0] ?? null;
    }

    public function execute(string $sql, string $types, array $params): int
    {
        if ($this->connection instanceof PDO) {
            $statement = $this->connection->prepare($sql);
            $statement->execute($params);
            return $statement->rowCount();
        }
        $statement = $this->connection->prepare($sql);
        if (!$statement) throw new RuntimeException('Database operation failed.');
        if ($params) $statement->bind_param($types, ...$params);
        if (!$statement->execute()) throw new RuntimeException('Database operation failed.');
        return $statement->affected_rows;
    }

    public function lastInsertId(): int
    {
        return $this->connection instanceof PDO
            ? (int) $this->connection->lastInsertId()
            : (int) $this->connection->insert_id;
    }
}

function blog_post_select(): string
{
    return 'SELECT p.*, c.name AS category_name, c.slug AS category_slug
            FROM blog_posts p
            LEFT JOIN blog_categories c ON c.id = p.category_id';
}
