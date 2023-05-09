UPDATE messages m 
	JOIN messages b ON m.base_message = b.id 
    SET 
		m.base_message_subject = b.subject,
		m.base_message_subject_type = b.subject_type,
		m.base_message_type = b.message_type
	WHERE m.base_message IS NOT NULL;

	SELECT `id`,`fromuser`,`touser`,`subject`,`subject_type`,`message_type`,`base_message`,`base_message_subject`,`base_message_subject_type`,`base_message_type`,`content`,`deleted`,`timestamp` 
	FROM `messages` 
    WHERE (
		(
			(
				(`message_type`!=8) AND 
                (
					(`subject_type`!=9) OR 
                    (`subject` NOT IN (109,110,126,127,128,129,130,131,132,133,134,143,144,146,147))
				)
			) OR (
				(`message_type`=8) AND 
				(
					(`base_message_subject_type`!=9) OR 
					(`base_message_subject` NOT IN (109,110,126,127,128,129,130,131,132,133,134,143,144,146,147))
				)
			)
		) AND (
			(
				(`message_type`!=8) AND 
				(
					(`subject_type`!=8) OR 
					(`subject` NOT IN (130,131,132,133,134,135,136,137,138,139,140,148,149,151,152))
				)
			) OR (
				(`message_type`=8) AND 
				(
					(`base_message_subject_type`!=8) OR 
					(`base_message_subject` NOT IN (130,131,132,133,134,135,136,137,138,139,140,148,149,151,152))
				)
			)
		) AND (
			(
				(`message_type`!=8) AND 
                (
					(`subject_type`!=7) OR 
                    (`subject` NOT IN (38898245,38898246,38898247,38898248))
				)
			) OR (
				(`message_type`=8) AND 
                (
					(`base_message_subject_type`!=7) OR 
                    (`base_message_subject` NOT IN (38898245,38898246,38898247,38898248))
				)
			)
		) AND (
			(
				(`message_type`!=8) AND 
                (
					(`subject_type`!=3) OR 
                    (`subject` NOT IN (38676788,38676789,38676790,38676791,38676792,38676793))
				)
			) OR (
				(`message_type`=8) AND 
                (
					(`base_message_subject_type`!=3) OR 
                    (`base_message_subject` NOT IN (38676788,38676789,38676790,38676791,38676792,38676793))
				)
			)
		) 
	) AND (`id`=92829068) 
	ORDER BY `id` 
	LIMIT 1;