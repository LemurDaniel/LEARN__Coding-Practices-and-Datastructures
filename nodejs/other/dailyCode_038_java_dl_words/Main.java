
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;

public class Main {
    
    public static void main(String[] args) throws Exception{
		
		String filename = "038_41284_words.txt";
		String filepath = "C:\\Users\\Daniel Notebook\\Documents\\Git\\";
		
		new File(filepath).mkdirs();
		File file = new File(filepath + filename); 
        file.createNewFile();

		int start = 1;
		int end = 1000;


		while(end <= 42000) {
			if(end == 42000) end = 41284;

			String url = String.format("https://en.m.wiktionary.org/wiki/Wiktionary:Frequency_lists/TV/2006/%d-%d", start, end);
			Document doc = Jsoup.connect(url).get();

			Elements words = doc.select("tbody tr");


			int count = 0;
			for (int i=1; i<words.size(); i++) {

				Element word = words.get(i);
			
				try (BufferedWriter bw = new BufferedWriter(new FileWriter(file.getAbsolutePath(), true))) {
					String str = word.childNode(2).childNode(0).attr("title").split(" ")[0];
					bw.write(str+"\r\n");
					bw.flush();
				} catch (IOException ioe) {
					ioe.printStackTrace();
				}
	
			}

			System.out.println(String.format("Downloaded %d words", end));
			start = end+1;
			if(end < 10000) end += 1000;
			else end += 2000;
		}

	}

}
