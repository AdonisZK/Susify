CREATE OR REPLACE FUNCTION log_listing_deletions() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "ListingLog" (
    "listingId",
    "titleOld",
    "descriptionOld",
    "categoryOld",
    "stockOld",
    "priceOld"
  )
  VALUES (
    OLD.id,
    OLD.title,
    OLD.description,
    OLD.category,
    OLD.stock,
    OLD.price
  );
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER log_listing_deletions_trigger
AFTER
DELETE ON "Listing" FOR EACH ROW EXECUTE FUNCTION log_listing_deletions();