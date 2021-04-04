import React from 'react';
import { Badge, Card, Button, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);

export default function AssetCard({ asset }) {
  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>{asset.name}</Card.Title>

        <Container className="p-0 mb-2">
          {asset.tags.map((tag) => (
            <Badge key={tag} pill variant="dark" className="mr-1">
              {tag}
            </Badge>
          ))}
        </Container>

        <Card.Text>{asset.shortDescription}</Card.Text>

        <Button as={Link} variant="outline-primary" to={`/assets/${asset.id}`} className="rounded-pill">
          Details
        </Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated {dayjs.unix(asset.updatedAt).fromNow()}</small>
      </Card.Footer>
    </Card>
  );
}
