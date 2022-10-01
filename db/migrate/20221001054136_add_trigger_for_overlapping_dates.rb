class AddTriggerForOverlappingDates < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_slot_overlap ()
      RETURNS TRIGGER
      AS
      $$
      BEGIN
        IF EXISTS (
          SELECT
            *
          FROM slots s
          WHERE (s.start_time < NEW.start_time AND s.end_time > NEW.start_time)  OR (s.start_time < NEW.end_time AND s.end_time > NEW.end_time))
        THEN
          ROLLBACK;
          RAISE EXCEPTION 'Overlaping slots not allowed';
        ELSE
          RETURN NEW;
        END IF;
      END;
      $$
      LANGUAGE 'plpgsql';
      CREATE TRIGGER slots_overlap AFTER INSERT ON slots EXECUTE PROCEDURE check_slot_overlap ()
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER slots_overlap ON slots;
    SQL
  end
end
