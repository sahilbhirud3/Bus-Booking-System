package com.app.dto;
import java.util.List;
import com.app.entities.Base;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SeatDto extends Base{

	
	private long busId;
	private List<Integer> seatNos;
	
}