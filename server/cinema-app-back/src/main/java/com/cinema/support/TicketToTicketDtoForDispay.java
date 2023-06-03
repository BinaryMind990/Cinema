package com.cinema.support;

import java.util.ArrayList;
import java.util.List;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.cinema.model.Ticket;
import com.cinema.web.dto.TicketDtoForDisplay;

@Component
public class TicketToTicketDtoForDispay implements Converter<Ticket, TicketDtoForDisplay>{

	@Override
	public TicketDtoForDisplay convert(Ticket source) {
		TicketDtoForDisplay dto = new TicketDtoForDisplay();
		dto.setId(source.getId());
		dto.setUserId(source.getUser().getId());
		dto.setUserName(source.getUser().getUserName());
		String []dateTime = source.getDateAndTime().toString().split("T");
		dto.setTicketSellDate(dateTime[0]);
		dto.setTicketSellTime(dateTime[1]);
				
		return dto;
	}
	
	public List<TicketDtoForDisplay> convertAll(List<Ticket> tickets){
		List<TicketDtoForDisplay> dtos = new ArrayList<TicketDtoForDisplay>();
		for(Ticket t : tickets) {
			dtos.add(convert(t));
		}
		return dtos;
	}

}
